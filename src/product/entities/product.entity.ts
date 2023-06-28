import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  p_id: number;

  @Field()
  @Column({ default: '' })
  p_name: string;

  @Field()
  @Column({ default: 0 })
  p_price: number;
}
