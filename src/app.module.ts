import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
