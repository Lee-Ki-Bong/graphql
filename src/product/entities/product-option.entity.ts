import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product_option' })
export class ProductOptionEntity {
  @PrimaryGeneratedColumn()
  po_id: number;

  @Column({ default: '' })
  po_name: string;

  @Column({ default: '' })
  po_value: string;

  @ManyToOne(() => ProductEntity, (po_product) => po_product.p_product_options)
  po_product: ProductEntity;
}
