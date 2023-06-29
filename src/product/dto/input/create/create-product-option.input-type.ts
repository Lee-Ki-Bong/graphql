import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductOptionInput {
  @Field()
  po_name: string;

  @Field()
  po_value: string;
}
