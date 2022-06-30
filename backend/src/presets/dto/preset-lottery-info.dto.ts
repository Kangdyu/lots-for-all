import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { PresetLottery } from '../entities/presetLottery.entity';

export class PresetLotteryInfoDto {
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

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(entity: PresetLottery) {
    this.id = entity.id;
    this.type = 1;
    this.title = entity.title;
    this.number = entity.number;
    this.content = entity.content.split(',');
    this.wins = entity.wins;
    this.createdAt = entity.created_at;
    this.updatedAt = entity.updated_at;
  }
}
