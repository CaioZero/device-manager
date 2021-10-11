import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from '../../device/entities/device.entity';

@Entity()
export class Category extends BaseEntity {
  constructor(id: number, name: string) {
    super();
    this.id = id;
    this.name = name;
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 128, nullable: false })
  name: string;

  @OneToMany(() => Device, () => Device)
  device: Device[];
}
