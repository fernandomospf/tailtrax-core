import { Injectable } from '@nestjs/common';

export interface HealthCheck {
  code: number;
  message: string;
}

@Injectable()
export class AppService {
  healthCheck(): HealthCheck {
    return {
      code: 200,
      message: 'Healthy',
    };
  }
}
