import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    if (product === null) {
      throw new HttpException(`ID ${id} was not found.`, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updateProduct = await this.productsService.update(
      +id,
      updateProductDto,
    );
    if (!updateProduct) {
      throw new HttpException(
        `ID ${id} was not found for change.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return updateProduct;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const removeProducts = await this.productsService.remove(+id);
    if (!removeProducts) {
      throw new HttpException(
        `ID ${id} was not found to be removed.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return removeProducts;
  }
}
