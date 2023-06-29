import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductTagInput {
  @Field(() => Int, { nullable: true })
  pt_id: number;

  @Field({ nullable: true })
  pt_name: string;
}
