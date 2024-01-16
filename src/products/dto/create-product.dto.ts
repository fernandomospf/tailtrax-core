import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
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

  @IsNumber()
  @IsPositive()
  @Min(1, { message: 'amount must be greater than zero (0).' })
  amount: number;

  @IsString()
  @IsNotEmpty()
  measurement_unit: string;

  @IsDateString()
  expired_date: Date;

  @IsDateString()
  @IsOptional()
  last_purchase_date: Date;

  @IsNumber()
  price: number;

  @IsBoolean()
  has_stock: boolean;

  @IsString()
  ps: string;
}
