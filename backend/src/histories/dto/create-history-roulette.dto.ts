import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHistoryRouletteDto {
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

  @IsNotEmpty()
  @IsString()
  result: string;
}
