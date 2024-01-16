import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class productsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.prisma.products.create({ data: createProductDto });
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.prisma.products.findMany();
  }

  async findOne(id: number): Promise<ProductEntity> {
    return this.prisma.products.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number): Promise<ProductEntity> {
    return this.prisma.products.delete({ where: { id } });
  }
}
