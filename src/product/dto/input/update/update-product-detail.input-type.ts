import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductDetailInput {
  @Field(() => Int, { nullable: true })
  pd_id: number;

  @Field({ nullable: true })
  pd_description: string;
}
