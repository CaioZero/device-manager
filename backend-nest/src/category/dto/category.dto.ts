import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CategoryDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Length(0, 128)
  @IsString()
  @IsNotEmpty()
  name: string;
}
