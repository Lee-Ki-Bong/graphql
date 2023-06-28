import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly prdRepo: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const product = plainToInstance(Product, createProductInput);
    const rewProduct = await this.prdRepo.save(product);
    return rewProduct;
  }

  async findAll() {
    const productList = await this.prdRepo.find();
    return productList;
  }

  async findOne(id: number) {
    const product = await this.prdRepo.findOneBy({ p_id: id });
    return product;
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    const product = plainToInstance(Product, updateProductInput);
    const rewProduct = await this.prdRepo.update(id, product);
    return rewProduct;
  }

  async remove(id: number) {
    const res = await this.prdRepo.delete(id);
    return res.affected ? true : false;
  }
}
