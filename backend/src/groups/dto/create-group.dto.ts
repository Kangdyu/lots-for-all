import { IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  title: string;

  members: string[];
}
