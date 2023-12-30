import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { productsRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: productsRepository) {}

  create(createProductDto: CreateProductDto) {
    const { amount } = createProductDto;

    if (+amount > 0) createProductDto.has_stock = true;
    return this.repository.create(createProductDto);
  }

  // findAll() {
  //   return `This action returns all products`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
