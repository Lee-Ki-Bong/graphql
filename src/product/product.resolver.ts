import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';

import { CreateProductInput } from './dto/input/create/create-product.input-type';
import { ProductObject } from './dto/response/product.object-type';
import { UpdateProductInput } from './dto/input/update/update-product.input-type';

@Resolver(() => ProductObject)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => ProductObject)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [ProductObject])
  async findAllProduct() {
    return this.productService.findAll();
  }

  @Query(() => ProductObject)
  async findOneProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => ProductObject)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(updateProductInput);
  }

  @Mutation(() => Boolean)
  async removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
