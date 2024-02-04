import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Banho pequeno porte',
    description: 'The name of the service',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 55.0,
    description: 'The price of the service',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 5,
    description: 'The discount of the service',
  })
  @IsNumber()
  discount?: number;
}
