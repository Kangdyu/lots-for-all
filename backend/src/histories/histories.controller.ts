import { Controller, Body, Param, Get, Post, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';
import { JwtAuthGuard } from 'src/users/jwt/jwt.guard';
import { CreateHistoryLadderDto } from './dto/create-history-ladder.dto';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryInfoDto } from './dto/history-info.dto';
import { HistoriesService } from './histories.service';

@ApiTags('histories')
@Controller('users')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @ApiOperation({ summary: '최근 플레이 기록 리스트 조회' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: '게임 종류(1: 제비뽑기, 2: 사다리타기, 3: 룰렛, 4: 경마)',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id/histories')
  async getGroups(@Param() param: { user_id: number }, @Query() query: { type?: number }) {
    return await this.historiesService.find(param.user_id, query.type);
  }

  @ApiOperation({ summary: '최근 플레이 기록 하나 조회' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'history_id', required: true, description: '기록 아이디' })
  @ApiQuery({
    name: 'type',
    required: true,
    description: '게임 종류(1: 제비뽑기, 2: 사다리타기, 3: 룰렛, 4: 경마)',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id/histories/:history_id')
  async getGroupOne(
    @Param() param: { user_id: number; history_id: number },
    @Query() query: { type: number }
  ) {
    return await this.historiesService.findOne(param.user_id, param.history_id, query.type);
  }

  @ApiOperation({ summary: '최근 플레이 기록 생성' })
  @ApiBody({ type: CreateHistoryLadderDto })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('/:user_id/histories')
  async signup(
    @Param() param: { user_id: number },
    @Body() createHistoryDto: CreateHistoryDto
  ): Promise<CommonResponse<HistoryInfoDto>> {
    return await this.historiesService.create(param.user_id, createHistoryDto);
  }

  @ApiOperation({ summary: '최근 플레이 기록 삭제' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'history_id', required: true, description: '기록 아이디' })
  @ApiQuery({
    name: 'type',
    required: true,
    description: '게임 종류(1: 제비뽑기, 2: 사다리타기, 3: 룰렛, 4: 경마)',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete('/:user_id/histories/:history_id')
  async deleteUser(
    @Param() param: { user_id: number; history_id: number },
    @Query() query: { type?: number }
  ) {
    return await this.historiesService.delete(param.user_id, param.history_id, query.type);
  }
}
