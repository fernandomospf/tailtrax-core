import { PrismaService } from 'src/prisma/prisma.service';
import { ServiceEntity } from '../entities/service.entity';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesRepository {
  constructor(public prisma: PrismaService) {}

  async create(createServiceDto: any): Promise<ServiceEntity> {
    return this.prisma.services.create({ data: createServiceDto });
  }

  async findAll(): Promise<ServiceEntity[]> {
    return this.prisma.services.findMany();
  }

  async findOne(id: number): Promise<ServiceEntity | null> {
    const service = await this.prisma.services.findUnique({ where: { id } });
    if (!service) return null;
    return service;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceEntity | null> {
    const serviceById = await this.findOne(id);
    if (!serviceById) return null;

    return this.prisma.services.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async remove(id: number): Promise<ServiceEntity | null> {
    const serviceById = await this.findOne(id);
    if (!serviceById) return null;

    return this.prisma.services.delete({ where: { id } });
  }
}
