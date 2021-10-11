import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategoryRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((category) =>
        Promise.resolve({ id: Date.now(), ...category }),
      ),
    find: jest.fn().mockImplementation(() => {
      return [
        { id: Date.now(), name: 'test 1' },
        { id: Date.now(), name: 'test 2' },
      ];
    }),
    findOne: jest.fn().mockImplementation(() => {
      return { id: Date.now(), name: 'test 1' };
    }),
    remove: jest.fn().mockImplementation(() => {
      return [];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all Categories and return', async () => {
    expect(await service.findAll()).toEqual([
      {
        id: expect.any(Number),
        name: 'test 1',
      },
      {
        id: expect.any(Number),
        name: 'test 2',
      },
    ]);
  });

  it('should get one Category and return ', async () => {
    expect(await service.findOne(Date.now())).toEqual({
      id: expect.any(Number),
      name: 'test 1',
    });
  });

  it('should create a new Category and return', async () => {
    expect(await service.create({ name: 'Test' })).toEqual({
      id: expect.any(Number),
      name: 'Test',
    });
  });
});
