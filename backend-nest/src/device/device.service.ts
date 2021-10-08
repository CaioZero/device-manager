import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateDeviceDto} from './dto/create-device.dto';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Device} from './entities/device.entity';
import {Category} from '../category/entities/category.entity';

@Injectable()
export class DeviceService {
  constructor(
      @InjectRepository(Device)
      private readonly repository: Repository<Device>,
  ) {
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.repository.findOne(id);
    if (!device) {
      throw new NotFoundException(`Category with ID=${id} not found`);
    }
    return device;
  }

  async create(createDeviceDto: CreateDeviceDto) {
    const category = await Category.findOne(createDeviceDto.category.id);
    if (category) {
      const newDevice = this.repository.create(createDeviceDto);
      return this.repository.save(newDevice);
    } else {
      throw new NotFoundException(
          `Category with ID=${createDeviceDto.category.id} not found`,
      );
    }
  }

  async remove(id: number) {
    const device = await this.findOne(id);
    return this.repository.remove(device);
  }
}
