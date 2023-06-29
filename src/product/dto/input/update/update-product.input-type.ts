import { InputType, Field, Int } from '@nestjs/graphql';
import { UpdateProductDetailInput } from './update-product-detail.input-type';
import { UpdateProductOptionInput } from './update-product-option.input-type';
import { UpdateProductTagInput } from './update-product-tag.input-type';

@InputType()
export class UpdateProductInput {
  @Field(() => Int)
  p_id: number;

  @Field({ nullable: true })
  p_name: string;

  @Field({ nullable: true })
  p_price: number;

  @Field(() => UpdateProductDetailInput, { nullable: true })
  p_product_detail: UpdateProductDetailInput;

  @Field(() => [UpdateProductOptionInput], { nullable: 'itemsAndList' }) // 'itemsAndList' : 배열자체 & 배열 아이템들 선택적
  p_product_options: [UpdateProductOptionInput];

  @Field(() => [UpdateProductTagInput], { nullable: 'itemsAndList' })
  p_product_tags: UpdateProductTagInput[];
}
