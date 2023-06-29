import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductDetailEntity } from './product-detail.entity';
import { ProductOptionEntity } from './product-option.entity';
import { ProductTagEntity } from './product-tag.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  p_id: number;

  @Column({ default: '' })
  p_name: string;

  @Column({ default: 0 })
  p_price: number;

  @OneToOne(() => ProductDetailEntity, { cascade: true })
  @JoinColumn({ name: 'product_detail_id' })
  p_product_detail: ProductDetailEntity;

  @OneToMany(
    () => ProductOptionEntity,
    (productOption) => productOption.po_product,
    {
      cascade: true,
    },
  )
  p_product_options: ProductOptionEntity[];

  @ManyToMany(() => ProductTagEntity, { cascade: true })
  @JoinTable({ name: 'product_product_tag_map' })
  p_product_tags: ProductTagEntity[];
}
