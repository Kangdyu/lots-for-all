import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { Group } from '../entities/groups.entitiy';

export class GroupInfoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  members: string[];

  constructor(entity: Group) {
    this.id = entity.id;
    this.title = entity.title;
    this.members = entity.members.split(',');
  }
}
