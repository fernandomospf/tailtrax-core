import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { ProductsRepository } from '../repositories/products.repository';
import { fakeInputProduct, fakeProducts } from './mocks/values.mocks';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products ', async () => {
      (repository.findAll as jest.Mock).mockResolvedValue(fakeProducts);
      const response = await service.findAll();

      expect(response).toEqual(fakeProducts);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      (repository.findOne as jest.Mock).mockImplementation(async (id) => {
        if (id === 1) {
          return fakeProducts[0];
        } else {
          return null;
        }
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should only list a single product ', async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakeProducts[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should not list a product if the ID is not found/non-existent', async () => {
      const response = await service.findOne(5);

      expect(response).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      (repository.create as jest.Mock).mockResolvedValue(fakeProducts[0]);

      const response = await service.create(fakeInputProduct);

      expect(response).toEqual(fakeProducts[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      (repository.update as jest.Mock).mockImplementation(async (id) => {
        if (id === 1) {
          return fakeProducts[0];
        } else {
          return null;
        }
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should change the product and return the new altered product', async () => {
      const response = await service.update(1, fakeInputProduct);

      expect(response).toEqual(fakeProducts[0]);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should not list a product if the ID is not found/non-existent', async () => {
      const response = await service.update(5, fakeInputProduct);

      expect(response).toBeNull();
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      (repository.remove as jest.Mock).mockImplementation(async (id) => {
        if (id === 1) {
          return fakeProducts[0];
        } else {
          return null;
        }
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('successfully removes the product', async () => {
      await service.remove(1);

      expect(repository.remove).toHaveBeenCalledTimes(1);
    });

    it('should not list a product if the ID is not found/non-existent', async () => {
      const response = await service.remove(5);

      expect(response).toBeNull();
    });
  });
});
