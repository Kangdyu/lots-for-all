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
import { Request } from 'express';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  private SALT_OR_ROUNDS = 10;

  async checkUserExist(critria: { id?: number; email?: string }): Promise<User> {
    const user: User = await this.usersRepository.findOneBy(critria);
    if (!user) {
      throw new BadRequestException('Cannot find user');
    }
    return user;
  }

  async checkUserAuthByJWT(req: Request, user_id) {
    if ((await this.getUserByJWT(req)).id != user_id) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  private async getUserByJWT(req: Request): Promise<User> {
    const decodedJwt = (await this.jwtService.decode(
      req.headers.authorization.split(' ')[1]
    )) as Payload;

    return await this.usersRepository.findOneBy({ id: parseInt(decodedJwt.sub) });
  }

  private entityToDto(entity: User): UserInfoDto {
    return new UserInfoDto({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      imageNo: entity.imageNo,
      imageUrl: `/${entity.imageNo}.png`,
    });
  }

  private async createUserEntityByDto(dto: CreateUserDto, randomProfile: boolean): Promise<User> {
    const user: User = new User();
    user.username = dto.username;
    user.email = dto.email;
    user.password = await bcrypt.hash(dto.password, this.SALT_OR_ROUNDS);
    user.imageNo = randomProfile ? Math.floor(Math.random() * 10) : dto.imageNo;

    return user;
  }

  async find(user_id: number): Promise<CommonResponse<UserInfoDto>> {
    const user: User = await this.checkUserExist({ id: user_id });

    return {
      result: this.entityToDto(user),
      message: 'success',
    };
  }

  async login(loginDto: LoginDto): Promise<CommonResponse<UserInfoDto & { token: string }>> {
    const { email, password } = loginDto;

    const user: User = await this.checkUserExist({ email });

    const isPasswordValidated: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordValidated) {
      throw new UnauthorizedException('Cannot login. Please check your email and password');
    }
    return {
      result: {
        ...this.entityToDto(user),
        token: this.jwtService.sign({ email: email, sub: user.id }),
      },
      message: 'success',
    };
  }

  async logined(req: Request): Promise<CommonResponse<UserInfoDto>> {
    return {
      result: this.entityToDto(await this.getUserByJWT(req)),
      message: 'success',
    };
  }

  async create(createUserDto: CreateUserDto): Promise<CommonResponse<UserInfoDto>> {
    if (await this.usersRepository.findOneBy({ email: createUserDto.email })) {
      throw new BadRequestException('email already exists');
    }

    const createdUser: User = await this.usersRepository.save(
      await this.createUserEntityByDto(createUserDto, true)
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
      await this.createUserEntityByDto(createUserDto, false)
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
