import { IsAlpha, IsInt, IsNotEmpty, Length, Min } from 'class-validator';
import { CategoryDto } from '../../category/dto/category.dto';

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
  category: CategoryDto;
}
