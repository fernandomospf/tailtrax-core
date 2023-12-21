import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  brand: string;

  @IsString()
  sku: string;

  @IsString()
  @IsPositive()
  amount: string;

  @IsString()
  @IsNotEmpty()
  measurement_unit: string;

  @IsDate()
  expired_date: Date;

  @IsDate()
  last_purchase_date: Date;

  @IsNumber()
  price: number;

  @IsBoolean()
  has_stock: boolean;

  @IsString()
  ps: string;
}
