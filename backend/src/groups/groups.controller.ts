import { Controller, Body, Param, Get, Post, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';
import { JwtAuthGuard } from 'src/users/jwt/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupInfoDto } from './dto/group-info.dto';
import { GroupsService } from './groups.service';

@ApiTags('groups')
@Controller('users')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly usersService: UsersService
  ) {}

  @ApiOperation({ summary: '그룹 리스트 조회' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id/groups')
  async getGroups(
    @Req() req: Request,
    @Param() param: { user_id: number }
  ): Promise<CommonResponse<GroupInfoDto[]>> {
    await this.usersService.checkUserAuthByJWT(req, param.user_id);
    return await this.groupsService.find(param.user_id);
  }

  @ApiOperation({ summary: '그룹 하나 조회' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'group_id', required: true, description: '그룹 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id/groups/:group_id')
  async getGroupOne(
    @Req() req: Request,
    @Param() param: { user_id: number; group_id: number }
  ): Promise<CommonResponse<GroupInfoDto>> {
    await this.usersService.checkUserAuthByJWT(req, param.user_id);
    return await this.groupsService.findOne(param.user_id, param.group_id);
  }

  @ApiOperation({ summary: '그룹 생성' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiBody({ type: CreateGroupDto })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('/:user_id/groups')
  async createGroup(
    @Req() req: Request,
    @Param() param: { user_id: number },
    @Body() createGroupDto: CreateGroupDto
  ): Promise<CommonResponse<GroupInfoDto>> {
    await this.usersService.checkUserAuthByJWT(req, param.user_id);
    return await this.groupsService.create(param.user_id, createGroupDto);
  }

  @ApiOperation({ summary: '그룹 업데이트' })
  @ApiBody({ type: CreateGroupDto })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'group_id', required: true, description: '그룹 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('/:user_id/groups/:group_id')
  async updateGroup(
    @Req() req: Request,
    @Param() param: { user_id: number; group_id: number },
    @Body() createGroupDto: CreateGroupDto
  ): Promise<CommonResponse<null>> {
    await this.usersService.checkUserAuthByJWT(req, param.user_id);
    return await this.groupsService.update(param.user_id, param.group_id, createGroupDto);
  }

  @ApiOperation({ summary: '그룹 삭제' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'group_id', required: true, description: '그룹 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete('/:user_id/groups/:group_id')
  async deleteGroup(
    @Req() req: Request,
    @Param() param: { user_id: number; group_id: number }
  ): Promise<CommonResponse<null>> {
    await this.usersService.checkUserAuthByJWT(req, param.user_id);
    return await this.groupsService.delete(param.user_id, param.group_id);
  }
}
