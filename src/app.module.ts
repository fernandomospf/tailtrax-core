import { Module } from '@nestjs/common';
import { AppController } from './healthCheck/app.controller';
import { AppService } from './healthCheck/app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
