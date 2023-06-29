import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductTagObject {
  @Field(() => ID)
  pt_id: number;

  @Field()
  pt_name: string;
}
