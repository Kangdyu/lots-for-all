import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { PresetHorse } from '../entities/presetHorse.entity';

export class PresetHorseInfoDto {
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

  constructor(entity: PresetHorse) {
    this.id = entity.id;
    this.type = 4;
    this.title = entity.title;
    this.number = entity.number;
    this.content = entity.content.split(',');
    this.createdAt = entity.created_at;
    this.updatedAt = entity.updated_at;
  }
}
