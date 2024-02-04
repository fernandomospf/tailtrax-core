import { Controller, Get } from '@nestjs/common';
import { AppService, HealthCheck } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health-check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): HealthCheck {
    return this.appService.healthCheck();
  }
}
