import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductTagInput {
  @Field()
  pt_name: string;
}
