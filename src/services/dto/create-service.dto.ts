import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  discount: number;
}
