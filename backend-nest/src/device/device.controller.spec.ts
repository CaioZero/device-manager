import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';

describe('DeviceController', () => {
  let controller: DeviceController;

  const mockDeviceService = {
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
          color: 'Test',
          partNumber: 123,
          category: {
            id: Date.now(),
            name: 'Test',
          },
        },
      ];
    }),
    findOne: jest.fn(() => {
      return [
        {
          id: Date.now(),
          color: 'Test',
          partNumber: 123,
          category: {
            id: Date.now(),
            name: 'Test',
          },
        },
      ];
    }),
    remove: jest.fn(() => {
      return [];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [DeviceService],
    })
      .overrideProvider(DeviceService)
      .useValue(mockDeviceService)
      .compile();

    controller = await module.get<DeviceController>(DeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all categories', () => {
    expect(controller.findAll()).toEqual([
      {
        id: expect.any(Number),
        color: 'Test',
        partNumber: 123,
        category: {
          id: expect.any(Number),
          name: 'Test',
        },
      },
    ]);
    expect(mockDeviceService.findAll).toHaveBeenCalled();
  });

  it('should get all categories', () => {
    expect(controller.findOne(Date.now())).toEqual([
      {
        id: expect.any(Number),
        color: 'Test',
        partNumber: 123,
        category: {
          id: expect.any(Number),
          name: 'Test',
        },
      },
    ]);
    expect(mockDeviceService.findOne).toHaveBeenCalled();
  });

  it('should create a Device', () => {
    const category = { id: 1, name: 'test' };

    const dto: CreateDeviceDto = {
      color: 'Test',
      partNumber: 123,
      category,
    };

    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      color: 'Test',
      partNumber: 123,
      category: {
        id: 1,
        name: 'test',
      },
    });
    expect(mockDeviceService.create).toHaveBeenCalledWith(dto);
  });

  it('should remove one category', () => {
    expect(controller.remove(Date.now())).toEqual([]);
    expect(mockDeviceService.remove).toHaveBeenCalled();
  });
});
