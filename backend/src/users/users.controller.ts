import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-dto';
import { UserInfoDto } from './dto/user-info.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: CreateUserDto })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<CommonResponse<UserInfoDto>> {
    return {
      result: await this.usersService.create(createUserDto),
      message: 'success',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<CommonResponse<{ token: string }>> {
    return {
      result: await this.usersService.login(loginDto),
      message: 'success',
    };
  }

  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @UseGuards(JwtAuthGuard)
  @Get('users/:user_id')
  async getUser(@Param() param: { user_id: number }): Promise<CommonResponse<UserInfoDto>> {
    const user = await this.usersService.find(param.user_id);

    return {
      result: new UserInfoDto({
        id: user.id,
        email: user.email,
        username: user.username,
        imageUrl: user.imageUrl,
      }),
      message: 'success',
    };
  }
}
