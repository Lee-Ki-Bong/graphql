import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductOptionObject } from './product-option.object-type';
import { ProductTagObject } from './product-tag.object-type';
import { ProductDetailObject } from './product-detail.object-type';

@ObjectType()
export class ProductObject {
  @Field(() => ID)
  p_id: number;

  @Field()
  p_name: string;

  @Field()
  p_price: number;

  @Field(() => ProductDetailObject, { nullable: true }) // 추가되기 이전 상품들은 없기 때문에 내보낼때 null 을 허용해야한다.
  p_product_detail: ProductDetailObject;

  @Field(() => [ProductOptionObject], { nullable: 'items' }) // 'items' : 필드가 배열 형태일 때, 배열자체는 필수 & 배열 아이템들 선택적
  p_product_options: ProductOptionObject[];

  @Field(() => [ProductTagObject], { nullable: 'items' })
  p_product_tags: ProductTagObject[];
}
