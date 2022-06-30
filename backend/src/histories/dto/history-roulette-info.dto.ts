import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { HistoryRoulette } from '../entities/historyRoulette.entity';

export class HistoryRouletteInfoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

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

  @IsDate()
  createdAt: Date;

  constructor(entity: HistoryRoulette) {
    this.id = entity.id;
    this.type = 3;
    this.title = entity.title;
    this.number = entity.number;
    this.content = entity.content.split(',');
    this.result = entity.result;
    this.createdAt = entity.created_at;
  }
}
