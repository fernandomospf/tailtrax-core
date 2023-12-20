import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class productsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.prisma.products.create({ data: createProductDto });
  }
}
