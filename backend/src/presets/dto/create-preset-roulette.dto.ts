import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePresetRouletteDto {
  @IsNotEmpty()
  @IsNumber()
  type: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  content: string[];
}
