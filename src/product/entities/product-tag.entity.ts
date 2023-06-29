import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_tag' })
export class ProductTagEntity {
  @PrimaryGeneratedColumn()
  pt_id: number;

  @Column()
  pt_name: string;
}
