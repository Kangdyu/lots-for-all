import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { User } from '../entities/users.entitiy';

export class UserInfoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNumber()
  imageNo: number;

  @IsOptional()
  imageUrl: string;

  constructor(entity: Partial<User & { imageUrl: string }>) {
    this.id = entity.id;
    this.email = entity.email;
    this.username = entity.username;
    this.imageNo = entity.imageNo;
    this.imageUrl = entity.imageUrl;
  }
}
