import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesRepository } from './repositories/service.repository';

@Injectable()
export class ServicesService {
  constructor(private readonly repository: ServicesRepository) {}

  create(createServiceDto: CreateServiceDto) {
    return this.repository.create(createServiceDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, UpdateServiceDto: UpdateServiceDto) {
    return this.update(id, UpdateServiceDto);
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
