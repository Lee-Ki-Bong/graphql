import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ProductDetailObject {
  @Field(() => ID)
  pd_id: number;

  @Field()
  pd_description: string;
}
