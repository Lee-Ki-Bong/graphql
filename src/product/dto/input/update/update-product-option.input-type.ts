import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductOptionInput {
  @Field(() => Int, { nullable: true })
  po_id: number;

  @Field({ nullable: true })
  po_name: string;

  @Field({ nullable: true })
  po_value: string;
}
