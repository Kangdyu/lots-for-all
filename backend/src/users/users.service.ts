import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entitiy';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async find(user_id: number): Promise<User> {
    return this.usersRepository.findOneBy({
      id: user_id,
    });
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Cannot login. Please check your email and password');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordValidated) {
      throw new UnauthorizedException('Cannot login. Please check your email and password');
    }
    return {
      token: this.jwtService.sign({ email: email, sub: user.id }),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;

    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return this.usersRepository.save(user);
  }
}
