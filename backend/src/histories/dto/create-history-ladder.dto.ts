import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHistoryLadderDto {
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
  topContent: string[];

  @IsNotEmpty()
  @IsString()
  bottomContent: string[];

  @IsNotEmpty()
  @IsString()
  result: string[];
}
