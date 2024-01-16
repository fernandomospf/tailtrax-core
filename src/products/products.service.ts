import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productsRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: productsRepository) {}

  create(createProductDto: CreateProductDto) {
    const { amount } = createProductDto;

    if (amount > 0) createProductDto.has_stock = true;
    return this.repository.create(createProductDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.repository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
