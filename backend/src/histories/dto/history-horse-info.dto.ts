import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { HistoryHorse } from '../entities/historyHorse.entity';

export class HistoryHorseInfoDto {
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
  result: string[];

  @IsDate()
  createdAt: Date;

  constructor(entity: HistoryHorse) {
    this.id = entity.id;
    this.type = 4;
    this.title = entity.title;
    this.number = entity.number;
    this.content = entity.content.split(',');
    this.result = entity.result.split(',');
    this.createdAt = entity.created_at;
  }
}
