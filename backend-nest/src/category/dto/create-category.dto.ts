import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(0, 128)
  @IsString()
  @IsNotEmpty()
  name: string;
}
