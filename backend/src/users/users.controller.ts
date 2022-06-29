import { Controller, Body, Param, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
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
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<CommonResponse<{ token: string }>> {
    return await this.usersService.login(loginDto);
  }

  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('users/:user_id')
  async getUser(@Param() param: { user_id: number }): Promise<CommonResponse<UserInfoDto>> {
    return await this.usersService.find(param.user_id);
  }

  @ApiOperation({ summary: '유저 정보 업데이트' })
  @ApiBody({ type: CreateUserDto })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('users/:user_id')
  async updateUser(
    @Param() param: { user_id: number },
    @Body() createUserDto: CreateUserDto
  ): Promise<CommonResponse<null>> {
    return await this.usersService.update(param.user_id, createUserDto);
  }

  @ApiOperation({ summary: '회원탈퇴' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete('users/:user_id')
  async deleteUser(@Param() param: { user_id: number }): Promise<CommonResponse<null>> {
    return await this.usersService.delete(param.user_id);
  }
}
