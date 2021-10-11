import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategoryService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: Date.now(),
          name: 'Test',
        },
      ];
    }),
    findOne: jest.fn(() => {
      return [
        {
          id: Date.now(),
          name: 'Test',
        },
      ];
    }),
    remove: jest.fn(() => {
      return [];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    controller = await module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all categories', () => {
    expect(controller.findAll()).toEqual([
      {
        id: expect.any(Number),
        name: 'Test',
      },
    ]);
    expect(mockCategoryService.findAll).toHaveBeenCalled();
  });

  it('should get one category', () => {
    expect(controller.findOne(Date.now())).toEqual([
      {
        id: expect.any(Number),
        name: 'Test',
      },
    ]);
    expect(mockCategoryService.findOne).toHaveBeenCalled();
  });

  it('should create a category', () => {
    const dto = { name: 'Test' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: 'Test',
    });
    expect(mockCategoryService.create).toHaveBeenCalledWith(dto);
  });

  it('should remove one category', () => {
    expect(controller.remove(Date.now())).toEqual([]);
    expect(mockCategoryService.remove).toHaveBeenCalled();
  });
});
