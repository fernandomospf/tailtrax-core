export const fakeProducts = [
  {
    id: 1,
    name: 'Primeiro produto',
    brand: 'marca do primeiro produto',
    sku: 'sku do primeiro produto',
    amount: 2,
    measurement_unit: 'Uni. de medida do primeiro produto',
    expired_date: new Date('2026-05-01T03:00:00.000Z'),
    last_purchase_date: new Date('2024-01-12T03:00:00.000Z'),
    price: 8.5,
    has_stock: true,
    ps: 'Observações/detalhes do primeiro produto',
  },
  {
    id: 2,
    name: 'Segundo produto',
    brand: 'marca do segundo produto',
    sku: 'sku do segundo produto',
    amount: 10,
    measurement_unit: 'Uni. de medida do segundo produto',
    expired_date: new Date('2026-10-31T03:00:00.000Z'),
    last_purchase_date: new Date('2024-01-12T03:00:00.000Z'),
    price: 2,
    has_stock: true,
    ps: 'Observações/detalhes do segundo produto',
  },
  {
    id: 3,
    name: 'Terceiro produto',
    brand: 'marca do terceiro produto',
    sku: 'sku do terceiro produto',
    amount: 0,
    measurement_unit: 'Uni. de medida do terceiro produto',
    expired_date: new Date('2026-01-31T03:00:00.000Z'),
    last_purchase_date: new Date('2024-01-13T03:00:00.000Z'),
    price: 2.5,
    has_stock: false,
    ps: 'Observações/detalhes do terceiro produto',
  },
  {
    id: 4,
    name: 'Quarto produto',
    brand: 'marca do quarto produto',
    sku: 'sku do quarto produto',
    amount: 0,
    measurement_unit: 'Uni. de medida do quarto produto',
    expired_date: new Date('2026-05-31T03:00:00.000Z'),
    last_purchase_date: new Date('2024-01-13T03:00:00.000Z'),
    price: 10,
    has_stock: false,
    ps: 'Observações/detalhes do quarto produto',
  },
];

export const fakeInputProduct = {
  name: 'Primeiro produto',
  brand: 'marca do primeiro produto',
  sku: 'sku do primeiro produto',
  amount: 2,
  measurement_unit: 'Uni. de medida do primeiro produto',
  expired_date: new Date('2026-05-01T03:00:00.000Z'),
  last_purchase_date: new Date(2024, 1, 12),
  price: 8.5,
  has_stock: true,
  ps: 'Observações/detalhes do primeiro produto',
};