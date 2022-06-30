import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Delete,
  UseGuards,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';
import { JwtAuthGuard } from 'src/users/jwt/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { CreatePresetLadderDto } from './dto/create-preset-ladder.dto';
import { CreatePresetDto } from './dto/create-preset.dto';
import { PresetInfoDto } from './dto/preset-info.dto';
import { PresetsService } from './presets.service';

@ApiTags('presets')
@Controller('users')
export class PresetsController {
  constructor(
    private readonly presetsService: PresetsService,
    private readonly usersService: UsersService
  ) {}

  @ApiOperation({ summary: '프리셋 리스트 조회' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: '게임 종류(1: 제비뽑기, 2: 사다리타기, 3: 룰렛, 4: 경마)',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id/presets')
  async getPresets(
    @Req() req: Request,
    @Param() param: { user_id: number },
    @Query() query: { type?: number }
  ) {
    await this.usersService.checkUserAuthByJWT(req, param.user_id);
    return await this.presetsService.find(param.user_id, query.type);
  }

  @ApiOperation({ summary: '프리셋 하나 조회' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'preset_id', required: true, description: '프리셋 아이디' })
  @ApiQuery({
    name: 'type',
    required: true,
    description: '게임 종류(1: 제비뽑기, 2: 사다리타기, 3: 룰렛, 4: 경마)',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id/presets/:preset_id')
  async getPresetOne(
    @Req() req: Request,
    @Param() param: { user_id: number; preset_id: number },
    @Query() query: { type: number }
  ) {
    await this.usersService.checkUserAuthByJWT(req, param.user_id);
    return await this.presetsService.findOne(param.user_id, param.preset_id, query.type);
  }

  @ApiOperation({ summary: '프리셋 생성' })
  @ApiBody({ type: CreatePresetLadderDto })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('/:user_id/presets')
  async createPreset(
    @Req() req: Request,
    @Param() param: { user_id: number },
    @Body() createPresetDto: CreatePresetDto
  ): Promise<CommonResponse<PresetInfoDto>> {
    await this.usersService.checkUserAuthByJWT(req, param.user_id);
    return await this.presetsService.create(param.user_id, createPresetDto);
  }

  @ApiOperation({ summary: '프리셋 업데이트' })
  @ApiBody({ type: CreatePresetLadderDto })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'preset_id', required: true, description: '프리셋 아이디' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('/:user_id/presets/:preset_id')
  async updatePreset(
    @Req() req: Request,
    @Param() param: { user_id: number; preset_id: number },
    @Body() createPresetDto: CreatePresetDto
  ): Promise<CommonResponse<null>> {
    await this.usersService.checkUserAuthByJWT(req, param.user_id);
    return await this.presetsService.update(
      param.user_id,
      param.preset_id,
      createPresetDto.type,
      createPresetDto
    );
  }

  @ApiOperation({ summary: '프리셋 삭제' })
  @ApiParam({ name: 'user_id', required: true, description: '유저 아이디' })
  @ApiParam({ name: 'preset_id', required: true, description: '기록 아이디' })
  @ApiQuery({
    name: 'type',
    required: true,
    description: '게임 종류(1: 제비뽑기, 2: 사다리타기, 3: 룰렛, 4: 경마)',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete('/:user_id/presets/:preset_id')
  async deletePreset(
    @Req() req: Request,
    @Param() param: { user_id: number; preset_id: number },
    @Query() query: { type?: number }
  ): Promise<CommonResponse<null>> {
    await this.usersService.checkUserAuthByJWT(req, param.user_id);
    return await this.presetsService.delete(param.user_id, param.preset_id, query.type);
  }
}
