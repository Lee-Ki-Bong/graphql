import { GraphQLSchema, GraphQLObjectType } from 'graphql';

/**
 * @author dhkehd2
 * @param schema : GraphQLSchema 인스턴스
 * @param typeName: 필드를 찾을 타입의 이름 (예: 'Query')
 * @param fieldName: 찾을 필드의 이름
 * @returns
 */
export function getFieldFromSchema(
  schema: GraphQLSchema,
  typeName: string,
  fieldName: string,
) {
  const type = schema.getType(typeName);

  if (!(type instanceof GraphQLObjectType)) {
    throw new Error(`Type '${typeName}' is not an object type.`);
  }

  const fields = type.getFields();

  if (!(fieldName in fields)) {
    throw new Error(
      `Field '${fieldName}' does not exist in type '${typeName}'.`,
    );
  }

  return fields[fieldName];
}

export function setComplexityField(
  schema: GraphQLSchema,
  typeName: string,
  fieldName: string,
  complexity: number,
) {
  const targetField = getFieldFromSchema(schema, typeName, fieldName);
  targetField.extensions = { complexity };
}
