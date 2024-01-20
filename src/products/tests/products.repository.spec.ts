import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from '../repositories/products.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { fakeInputProduct, fakeProducts } from './mocks/values.mocks';

describe('ProductsRepository', () => {
  let repository: ProductsRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsRepository,
        {
          provide: PrismaService,
          useValue: {
            products: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ProductsRepository>(ProductsRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products ', async () => {
      (repository.prisma.products.findMany as jest.Mock).mockResolvedValue(
        fakeProducts,
      );
      const response = await repository.findAll();

      expect(response).toEqual(fakeProducts);
      expect(prisma.products.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      (repository.prisma.products.findUnique as jest.Mock).mockImplementation(
        async ({ where: { id } }) => {
          if (id === 1) {
            return fakeProducts[0];
          } else {
            return null;
          }
        },
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should only list a single product ', async () => {
      const response = await repository.findOne(1);

      expect(response).toEqual(fakeProducts[0]);
      expect(prisma.products.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should not list a product if the ID is not found/non-existent', async () => {
      const response = await repository.findOne(5);

      expect(response).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      (repository.prisma.products.create as jest.Mock).mockResolvedValue(
        fakeProducts[0],
      );

      const response = await repository.create(fakeInputProduct);

      expect(response).toEqual(fakeProducts[0]);
      expect(prisma.products.create).toHaveBeenCalledTimes(1);
    });

    it('should create a new product with "has_stock" false if "amount" is 0.', async () => {
      const inputProductWithZeroAmount = {
        ...fakeInputProduct,
        amount: 0,
        has_stock: false,
      };

      (repository.prisma.products.create as jest.Mock).mockResolvedValue({
        ...fakeProducts[0],
        amount: 0,
        has_stock: false,
      });

      const response = await repository.create(inputProductWithZeroAmount);

      expect(response).toEqual({
        ...fakeProducts[0],
        amount: 0,
        has_stock: false,
      });
      expect(prisma.products.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      (repository.prisma.products.findUnique as jest.Mock).mockImplementation(
        async ({ where: { id } }) => {
          if (id === 1) {
            return fakeProducts[0];
          } else {
            return null;
          }
        },
      );

      (repository.prisma.products.update as jest.Mock).mockResolvedValue(
        fakeProducts[0],
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should change the product and return the new altered product', async () => {
      const response = await repository.update(1, fakeInputProduct);

      expect(response).toEqual(fakeProducts[0]);
      expect(prisma.products.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.products.update).toHaveBeenCalledTimes(1);
    });

    it('should not list a product if the ID is not found/non-existent', async () => {
      const response = await repository.update(5, fakeInputProduct);

      expect(response).toBeNull();
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      (repository.prisma.products.findUnique as jest.Mock).mockImplementation(
        async ({ where: { id } }) => {
          if (id === 1) {
            return fakeProducts[0];
          } else {
            return null;
          }
        },
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('successfully removes the product', async () => {
      await repository.remove(1);

      expect(prisma.products.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.products.delete).toHaveBeenCalledTimes(1);
    });

    it('should not list a product if the ID is not found/non-existent', async () => {
      const response = await repository.remove(5);

      expect(response).toBeNull();
    });
  });
});
