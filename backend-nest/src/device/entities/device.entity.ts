import { IsAlpha, Min } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsAlpha()
  @Column({ name: 'color', type: 'varchar', length: 16, nullable: false })
  color: string;

  @Min(0)
  @Column({ name: 'part_number', type: 'int', nullable: false })
  partNumber: number;

  @ManyToOne(() => Category, () => Category, { eager: true })
  category: Category;
}
