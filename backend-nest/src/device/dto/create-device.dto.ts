import {IsAlpha, IsInt, IsNotEmpty, Length, Min} from 'class-validator';
import {Category} from '../../category/entities/category.entity';

export class CreateDeviceDto {
  @IsAlpha()
  @Length(1, 16)
  @IsNotEmpty()
  color: string;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  partNumber: number;

  @IsNotEmpty()
  category: Category;
}
