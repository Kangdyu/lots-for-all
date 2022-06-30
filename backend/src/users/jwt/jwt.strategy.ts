import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';
import { Repository } from 'typeorm';
import { UserInfoDto } from '../dto/user-info.dto';
import { User } from '../entities/users.entitiy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
      ignoreExpiration: false,
    });
  }

  async validate(payload): Promise<CommonResponse<UserInfoDto>> {
    const user = await this.usersRepository.findOneBy(payload.id);

    if (user) {
      return {
        result: new UserInfoDto({
          id: user.id,
          email: user.email,
          username: user.username,
          imageNo: user.imageNo,
          imageUrl: `/${user.imageNo}.png`,
        }),
        message: 'success',
      };
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
