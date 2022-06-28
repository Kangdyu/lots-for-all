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

  @IsOptional()
  imageUrl: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
