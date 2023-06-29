import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductDetailEntity } from './entities/product-detail.entity';
import { ProductOptionEntity } from './entities/product-option.entity';
import { ProductTagEntity } from './entities/product-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductDetailEntity,
      ProductOptionEntity,
      ProductTagEntity,
    ]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
