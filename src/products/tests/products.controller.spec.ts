import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { fakeInputProduct, fakeProducts } from './mocks/values.mocks';
import * as request from 'supertest';
import { INestApplication, HttpStatus } from '@nestjs/common';

jest.mock('../products.service');

describe('ProductsController', () => {
  const dataFakeProducts = fakeProducts.map((product) => ({
    ...product,
    expired_date: product.expired_date.toISOString(),
    last_purchase_date: product.last_purchase_date.toISOString(),
  })); // método map utilizado para comparar os valores do tipo Date, evitando assim o conflito entre instâncias e strings.
  const productIdExisting: number = 1;
  const productIdNotExisting: number = 99919;
  let app: INestApplication;
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET, list products', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findAll').mockResolvedValue(fakeProducts);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return all products with status code 200', async () => {
      const response = await request(app.getHttpServer()).get('/products');

      expect(response.body).toEqual(dataFakeProducts);
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET (/:id), search for a single product', () => {
    beforeEach(() => {
      jest.spyOn(service, 'findOne').mockImplementation(async (id) => {
        if (id === productIdExisting) {
          return fakeProducts[0];
        } else {
          return null;
        }
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('return only a single product with status code 200', async () => {
      const response = await request(app.getHttpServer()).get(
        `/products/${productIdExisting}`,
      );

      expect(response.body).toEqual(dataFakeProducts[0]);
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return 404 status code for a non-existing product', async () => {
      const response = await request(app.getHttpServer()).get(
        `/products/${productIdNotExisting}`,
      );

      expect(response.body.message).toEqual(
        `ID ${productIdNotExisting} was not found.`,
      );
      expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST, must create a successful product.', () => {
    beforeEach(() => {
      jest.spyOn(service, 'create').mockResolvedValue(fakeProducts[0]);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns the product created with status code 201.', async () => {
      const response = await request(app.getHttpServer())
        .post('/products')
        .send(fakeInputProduct);

      expect(response.body).toEqual(dataFakeProducts[0]);
      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('calls the service create method with correct properties.', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .send(fakeInputProduct);

      const expectedArguments = {
        name: fakeInputProduct.name,
        brand: fakeInputProduct.brand,
        sku: fakeInputProduct.sku,
        amount: fakeInputProduct.amount,
        measurement_unit: fakeInputProduct.measurement_unit,
        expired_date: fakeInputProduct.expired_date.toISOString(),
        last_purchase_date: fakeInputProduct.last_purchase_date.toISOString(),
        price: fakeInputProduct.price,
        has_stock: fakeInputProduct.has_stock,
        ps: fakeInputProduct.ps,
      };

      expect(service.create).toHaveBeenCalledWith(expectedArguments);
    });
  });

  describe('PATCH, must successfully change the product and returns the new changed product', () => {
    beforeEach(() => {
      jest.spyOn(service, 'update').mockImplementation(async (id) => {
        if (id === productIdExisting) {
          return fakeProducts[0];
        } else {
          return null;
        }
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns the changed product with status code 200', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products/${productIdExisting}`)
        .send(fakeInputProduct);

      expect(response.body).toEqual(dataFakeProducts[0]);
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should return 404 status code for a non-existing product', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products/${productIdNotExisting}`)
        .send(fakeInputProduct);

      expect(response.body.message).toEqual(
        `ID ${productIdNotExisting} was not found for change.`,
      );
      expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE, should successfully delete the product.', () => {
    const productId: number = 1;

    beforeEach(() => {
      jest.spyOn(service, 'remove').mockImplementation(async (id) => {
        if (id === productIdExisting) {
          return fakeProducts[0];
        } else {
          return null;
        }
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns status 204 with no information in the request body', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/products/${productId}`,
      );

      expect(response.body).toEqual({});
      expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('should return 404 status code for a non-existing product', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/products/${productIdNotExisting}`,
      );

      expect(response.body.message).toEqual(
        `ID ${productIdNotExisting} was not found to be removed.`,
      );
      expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
