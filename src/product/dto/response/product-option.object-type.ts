import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductOptionObject {
  @Field(() => ID)
  po_id: number;

  @Field()
  po_name: string;

  @Field()
  po_value: string;
}
