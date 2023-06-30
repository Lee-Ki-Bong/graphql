import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';
import { Logger } from '@nestjs/common';
import { setComplexityField } from './use-complexity.functions';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener> {
    // 1. 복잡성 제한 값 설정 (요청 개수 제한)
    const maxComplexity = 200;

    // 2. GraphQL 스키마 정보 가져오기
    const { schema } = this.gqlSchemaHost;

    // 3. 특정 필드 복잡도 주기.
    setComplexityField(schema, 'ProductObject', 'p_product_options', 3);

    return {
      async didResolveOperation({ request, document }) {
        // 3. 쿼리 복잡성 계산
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            // 4. 필드 확장을 고려한 복잡성 추정기
            fieldExtensionsEstimator(),
            // 5. 단순 추정기 : 모든 필드의 복잡성 값은 1로 간주
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });

        // 6. 복잡성 제한을 초과할 경우 예외 발생
        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
          );
        }
        Logger.debug(complexity, 'Query Complexity');
      },
    };
  }
}
