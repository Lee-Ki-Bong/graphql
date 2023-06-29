import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { EntityManager, Repository } from 'typeorm';
import { CreateProductInput } from './dto/input/create/create-product.input-type';
import { UpdateProductInput } from './dto/input/update/update-product.input-type';
import { ProductObject } from './dto/response/product.object-type';

import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(ProductEntity)
    private readonly prdRepo: Repository<ProductEntity>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const product = plainToInstance(ProductEntity, createProductInput);
    const rewProduct = await this.prdRepo.save(product);
    return plainToInstance(ProductObject, rewProduct);
  }

  async findAll() {
    const productList = await this.prdRepo.find({
      relations: {
        p_product_detail: true,
        p_product_options: true,
        p_product_tags: true,
      },
    });
    return plainToInstance(ProductObject, productList);
  }

  async findOne(id: number) {
    const product = await this.prdRepo.findOne({
      where: { p_id: id },
      relations: {
        p_product_detail: true,
        p_product_options: true,
        p_product_tags: true,
      },
    });
    return plainToInstance(ProductObject, product);
  }

  async update(updateProductInput: UpdateProductInput) {
    const rewProduct = await this.entityManager.transaction(
      async (entityManager) => {
        const updateProduct = plainToInstance(
          ProductEntity,
          updateProductInput,
        );
        await entityManager.save(updateProduct);
        const newProduct = await entityManager.findOne(ProductEntity, {
          where: { p_id: updateProduct.p_id },
          relations: {
            p_product_detail: true,
            p_product_options: true,
            p_product_tags: true,
          },
        });
        return newProduct;
      },
    );
    return plainToInstance(ProductObject, rewProduct);
  }

  async remove(id: number) {
    const res = await this.prdRepo.delete(id);
    return res.affected ? true : false;
  }
}
