import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entitiy';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';
import { UserInfoDto } from './dto/user-info.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  private SALT_OR_ROUNDS = 10;

  private async checkUserExist(critria: { id?: number; email?: string }): Promise<User> {
    const user: User = await this.usersRepository.findOneBy(critria);
    if (!user) {
      throw new BadRequestException('Cannot find user');
    }
    return user;
  }

  private entityToDto(entity: User): UserInfoDto {
    return new UserInfoDto({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      imageUrl: entity.imageUrl,
    });
  }

  private async createUserEntityByDto(dto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.username = dto.username;
    user.email = dto.email;
    user.password = await bcrypt.hash(dto.password, this.SALT_OR_ROUNDS);

    return user;
  }

  async find(user_id: number): Promise<CommonResponse<UserInfoDto>> {
    const user: User = await this.checkUserExist({ id: user_id });

    return {
      result: this.entityToDto(user),
      message: 'success',
    };
  }

  async login(loginDto: LoginDto): Promise<CommonResponse<{ token: string }>> {
    const { email, password } = loginDto;

    const user: User = await this.checkUserExist({ email });

    const isPasswordValidated: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordValidated) {
      throw new UnauthorizedException('Cannot login. Please check your email and password');
    }
    return {
      result: {
        token: this.jwtService.sign({ email: email, sub: user.id }),
      },
      message: 'success',
    };
  }

  async create(createUserDto: CreateUserDto): Promise<CommonResponse<UserInfoDto>> {
    const createdUser: User = await this.usersRepository.save(
      await this.createUserEntityByDto(createUserDto)
    );

    return {
      result: this.entityToDto(createdUser),
      message: 'success',
    };
  }

  async update(user_id: number, createUserDto: CreateUserDto): Promise<CommonResponse<null>> {
    await this.checkUserExist({ id: user_id });

    const updatedUser: UpdateResult = await this.usersRepository.update(
      {
        id: user_id,
      },
      await this.createUserEntityByDto(createUserDto)
    );
    return {
      message: 'success',
    };
  }

  async delete(user_id: number): Promise<CommonResponse<null>> {
    await this.checkUserExist({ id: user_id });
    await this.usersRepository.delete({ id: user_id });

    return {
      message: 'success',
    };
  }
}
