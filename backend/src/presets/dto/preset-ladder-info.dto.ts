import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { PresetLadder } from '../entities/presetLadder.entity';

export class PresetLadderInfoDto {
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

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(entity: PresetLadder) {
    this.id = entity.id;
    this.type = 2;
    this.title = entity.title;
    this.number = entity.number;
    this.topContent = entity.topContent.split(',');
    this.bottomContent = entity.bottomContent.split(',');
    this.createdAt = entity.created_at;
    this.updatedAt = entity.updated_at;
  }
}
