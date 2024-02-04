import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
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
    if (!id || typeof id !== 'number') {
      throw new Error('ID is required');
    }
    return this.repository.findOne(id);
  }

  remove(id: number) {
    if (!id || typeof id !== 'number') {
      throw new Error('ID is required');
    }
    return this.repository.remove(id);
  }
}
