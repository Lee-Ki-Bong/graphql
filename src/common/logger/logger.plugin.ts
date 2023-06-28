import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestContextDidEncounterErrors,
  GraphQLRequestContextDidResolveOperation,
  GraphQLRequestContextWillSendResponse,
  GraphQLRequestListener,
} from '@apollo/server';
import { GraphQLResponseBody } from '@apollo/server/dist/esm/externalTypes/graphql';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';
import { FormattedExecutionResult } from 'graphql';

@Plugin()
export class LoggerPlugin implements ApolloServerPlugin {
  async requestDidStart(
    context: GraphQLRequestContext<any>,
  ): Promise<GraphQLRequestListener<any>> {
    Logger.debug('GraphQL 요청이 옴.', LoggerPlugin.name);
    return {
      didResolveOperation: async (
        reqContext: GraphQLRequestContextDidResolveOperation<any>,
      ) => {
        Logger.log(reqContext.queryHash, '요청 쿼리 해시'); // 쿼리 추척 | 캐싱 | 쿼리 식별
        Logger.log(`\n` + reqContext.source, '요청 쿼리');
        Logger.debug(
          `GraphQL 요청된 쿼리 or 뮤테이션 작업을 해결함.`,
          reqContext.operationName,
          // http://localhost:3000/graphql 을 띄우고 있을경우 [IntrospectionQuery] 요청이 반복적으로 온다. 주기적으로 스키마를 읽어가기 때문.
        );
      },
      willSendResponse: async (
        resContext: GraphQLRequestContextWillSendResponse<any>,
      ) => {
        Logger.debug(`GraphQL 응답을 보낼 것임.`, LoggerPlugin.name);
        this.loggingResponseData(resContext.response.body);
      },
      didEncounterErrors: async (
        errors: GraphQLRequestContextDidEncounterErrors<any>,
      ) => {
        Logger.error('GraphQL 오류 발생');
        console.log(errors);
      },
    };
  }

  private loggingResponseData(response: GraphQLResponseBody) {
    switch (response.kind) {
      case 'single': // 쿼리 또는 뮤테이션의 실행 결과
        const formattedResult: FormattedExecutionResult = response.singleResult;
        Logger.log(formattedResult.data);
        break;
      case 'incremental': // 실시간 업데이트를 제공하는 구독(subscription)
        Logger.debug(`실시간 업데이트 제공`);
        break;
      default:
        Logger.error('알수없는 응답형태입니다.', LoggerPlugin.name);
        break;
    }
  }
}
