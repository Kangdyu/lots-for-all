import { Controller, Body, Param, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';
import { JwtAuthGuard } from 'src/users/jwt/jwt.guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupInfoDto } from './dto/group-info.dto';
import { GroupsService } from './groups.service';

@ApiTags('groups')
@Controller('users')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: '그룹 리스트 조회' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id/groups')
  async getGroups(
    @Param() param: { user_id: number }
  ): Promise<CommonResponse<{ groups: GroupInfoDto[] }>> {
    return await this.groupsService.find(param.user_id);
  }

  @ApiOperation({ summary: '그룹 하나 조회' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'group_id', required: true, description: '그룹 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id/groups/:group_id')
  async getGroupOne(
    @Param() param: { user_id: number; group_id: number }
  ): Promise<CommonResponse<{ group: GroupInfoDto }>> {
    return await this.groupsService.findOne(param.user_id, param.group_id);
  }

  @ApiOperation({ summary: '그룹 생성' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiBody({ type: CreateGroupDto })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('/:user_id/groups')
  async signup(
    @Param() param: { user_id: number },
    @Body() createGroupDto: CreateGroupDto
  ): Promise<CommonResponse<GroupInfoDto>> {
    return await this.groupsService.create(param.user_id, createGroupDto);
  }

  @ApiOperation({ summary: '그룹 업데이트' })
  @ApiBody({ type: CreateGroupDto })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'group_id', required: true, description: '그룹 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('/:user_id/groups/:group_id')
  async updateUser(
    @Param() param: { user_id: number; group_id: number },
    @Body() createGroupDto: CreateGroupDto
  ): Promise<CommonResponse<null>> {
    return await this.groupsService.update(param.user_id, param.group_id, createGroupDto);
  }

  @ApiOperation({ summary: '그룹 삭제' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'group_id', required: true, description: '그룹 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete('/:user_id/groups/:group_id')
  async deleteUser(
    @Param() param: { user_id: number; group_id: number }
  ): Promise<CommonResponse<null>> {
    return await this.groupsService.delete(param.user_id, param.group_id);
  }
}
