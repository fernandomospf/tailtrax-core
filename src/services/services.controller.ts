import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiBody({ type: CreateServiceDto })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
