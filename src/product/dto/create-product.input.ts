import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  p_name: string;

  @Field()
  p_price: number;
}
