import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePresetLotteryDto {
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
  @IsNumber()
  wins: number;
}
