import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { Device } from './entities/device.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DeviceService', () => {
  let service: DeviceService;

  const mockDeviceRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((category) =>
        Promise.resolve({ id: Date.now(), ...category }),
      ),
    find: jest.fn().mockImplementation(() => {
      return [
        {
          id: Date.now(),
          color: 'test 1',
          partNumber: 123,
          category: { id: Date.now(), name: 'test 1' },
        },
        {
          id: Date.now(),
          color: 'test 2',
          partNumber: 123,
          category: { id: Date.now(), name: 'test 2' },
        },
      ];
    }),
    findOne: jest.fn().mockImplementation(() => {
      return {
        id: Date.now(),
        color: 'test 2',
        partNumber: 123,
        category: { id: Date.now(), name: 'test 2' },
      };
    }),
    remove: jest.fn().mockImplementation(() => {
      return [];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: getRepositoryToken(Device),
          useValue: mockDeviceRepository,
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all Categories and return', async () => {
    expect(await service.findAll()).toEqual([
      {
        id: expect.any(Number),
        color: 'test 1',
        partNumber: 123,
        category: { id: expect.any(Number), name: 'test 1' },
      },
      {
        id: expect.any(Number),
        color: 'test 2',
        partNumber: 123,
        category: { id: expect.any(Number), name: 'test 2' },
      },
    ]);
  });

  it('should get one Category and return ', async () => {
    expect(await service.findOne(Date.now())).toEqual({
      id: expect.any(Number),
      color: 'test 2',
      partNumber: 123,
      category: { id: expect.any(Number), name: 'test 2' },
    });
  });
});
