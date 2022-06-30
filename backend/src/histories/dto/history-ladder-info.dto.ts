import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { HistoryLadder } from '../entities/historyLadder.entity';

export class HistoryLadderInfoDto {
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
  topContent: string[];

  @IsNotEmpty()
  @IsString()
  bottomContent: string[];

  @IsNotEmpty()
  @IsString()
  result: string[];

  @IsDate()
  createdAt: Date;

  constructor(entity: HistoryLadder) {
    this.id = entity.id;
    this.type = 2;
    this.title = entity.title;
    this.number = entity.number;
    this.topContent = entity.topContent.split(',');
    this.bottomContent = entity.bottomContent.split(',');
    this.result = entity.result.split(',');
    this.createdAt = entity.created_at;
  }
}
