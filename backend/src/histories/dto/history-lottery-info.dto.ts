import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { HistoryLottery } from '../entities/historyLottery.entity';

export class HistoryLotteryInfoDto {
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
  @IsNumber()
  wins: number;

  @IsNotEmpty()
  @IsString()
  result: string[];

  @IsDate()
  createdAt: Date;

  constructor(entity: HistoryLottery) {
    this.id = entity.id;
    this.type = 1;
    this.title = entity.title;
    this.number = entity.number;
    this.content = entity.content.split(',');
    this.wins = entity.wins;
    this.result = entity.result.split(',');
    this.createdAt = entity.created_at;
  }
}
