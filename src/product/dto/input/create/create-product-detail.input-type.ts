import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductDetailInput {
  @Field()
  pd_description: string;
}
