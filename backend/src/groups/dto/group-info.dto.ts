import { IsNumber, IsNotEmpty } from 'class-validator';
import { Group } from '../entities/groups.entitiy';

export class GroupInfoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  members: string[];

  constructor(entity: Group) {
    this.id = entity.id;
    this.members = entity.members.split(',');
  }
}
