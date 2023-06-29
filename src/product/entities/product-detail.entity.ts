import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_detail' })
export class ProductDetailEntity {
  @PrimaryGeneratedColumn()
  pd_id: number;

  @Column()
  pd_description: string;
}
