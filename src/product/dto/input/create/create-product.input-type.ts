import { InputType, Field } from '@nestjs/graphql';
import { CreateProductDetailInput } from './create-product-detail.input-type';
import { CreateProductOptionInput } from './create-product-option.input-type';
import { CreateProductTagInput } from './create-product-tag.input-type';

@InputType()
export class CreateProductInput {
  @Field()
  p_name: string;

  @Field()
  p_price: number;

  @Field(() => CreateProductDetailInput, { nullable: true })
  p_product_detail: CreateProductDetailInput;

  @Field(() => [CreateProductDetailInput], { nullable: 'items' }) // 'items' : 필드가 배열 형태일 때, 배열자체는 필수 & 배열 아이템들 선택적
  p_product_options: CreateProductOptionInput[];

  @Field(() => [CreateProductTagInput], { nullable: 'items' })
  p_product_tags: CreateProductTagInput[];
}
