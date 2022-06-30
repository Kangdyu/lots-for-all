import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { PresetRoulette } from '../entities/presetRoulette.entity';

export class PresetRouletteInfoDto {
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

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(entity: PresetRoulette) {
    this.id = entity.id;
    this.type = 3;
    this.title = entity.title;
    this.number = entity.number;
    this.content = entity.content.split(',');
    this.createdAt = entity.created_at;
    this.updatedAt = entity.updated_at;
  }
}
