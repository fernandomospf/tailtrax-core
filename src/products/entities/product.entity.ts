export class ProductEntity {
  id: number;
  name: string;
  brand: string;
  sku: string;
  amount: string;
  measurement_unit: string;
  expired_date: Date;
  last_purchase_date: Date;
  price: number;
  has_stock: boolean;
  ps: string;
}
