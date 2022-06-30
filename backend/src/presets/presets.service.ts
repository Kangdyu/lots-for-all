import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePresetHorseDto } from './dto/create-preset-horse.dto';
import { CreatePresetLadderDto } from './dto/create-preset-ladder.dto';
import { CreatePresetLotteryDto } from './dto/create-preset-lottery.dto';
import { CreatePresetRouletteDto } from './dto/create-preset-roulette.dto';
import { CreatePresetDto } from './dto/create-preset.dto';
import { PresetHorseInfoDto } from './dto/preset-horse-info.dto';
import { PresetInfoDto } from './dto/preset-info.dto';
import { PresetLadderInfoDto } from './dto/preset-ladder-info.dto';
import { PresetLotteryInfoDto } from './dto/preset-lottery-info.dto';
import { PresetRouletteInfoDto } from './dto/preset-roulette-info.dto';
import { PresetHorse } from './entities/presetHorse.entity';
import { PresetLadder } from './entities/presetLadder.entity';
import { PresetLottery } from './entities/presetLottery.entity';
import { PresetRoulette } from './entities/presetRoulette.entity';

type Preset = PresetLottery | PresetLadder | PresetRoulette | PresetHorse;

@Injectable()
export class PresetsService {
  constructor(
    @InjectRepository(PresetLottery) private presetLotteryRepository: Repository<PresetLottery>,
    @InjectRepository(PresetLadder) private presetLadderRepository: Repository<PresetLadder>,
    @InjectRepository(PresetRoulette)
    private presetRouletteRepository: Repository<PresetRoulette>,
    @InjectRepository(PresetHorse) private presetHorseRepository: Repository<PresetHorse>,
    private readonly usersService: UsersService
  ) {}

  private async checkPresetExist(type: number, preset_id: number): Promise<Preset> {
    let preset: Preset;

    if (type == 1) {
      preset = await this.presetLotteryRepository.findOneBy({ id: preset_id });
    } else if (type == 2) {
      preset = await this.presetLadderRepository.findOneBy({ id: preset_id });
    } else if (type == 3) {
      preset = await this.presetRouletteRepository.findOneBy({ id: preset_id });
    } else if (type == 4) {
      preset = await this.presetHorseRepository.findOneBy({ id: preset_id });
    }

    if (!preset) {
      throw new BadRequestException('Cannot find preset');
    }
    return preset;
  }

  async find(user_id: number, type?: number): Promise<CommonResponse<PresetInfoDto[]>> {
    const user = await this.usersService.checkUserExist({ id: user_id });

    let array: PresetInfoDto[] = [];
    if (!type) {
      array = array.concat(
        (await this.presetLotteryRepository.find({ where: { user: user } })).map(
          (preset) => new PresetLotteryInfoDto(preset)
        )
      );
      array = array.concat(
        (await this.presetLadderRepository.find({ where: { user: user } })).map(
          (preset) => new PresetLadderInfoDto(preset)
        )
      );
      array = array.concat(
        (await this.presetRouletteRepository.find({ where: { user: user } })).map(
          (preset) => new PresetRouletteInfoDto(preset)
        )
      );
      array = array.concat(
        (await this.presetHorseRepository.find({ where: { user: user } })).map(
          (preset) => new PresetHorseInfoDto(preset)
        )
      );
    } else {
      if (type == 1) {
        array = array.concat(
          (await this.presetLotteryRepository.find({ where: { user: user } })).map(
            (preset) => new PresetLotteryInfoDto(preset)
          )
        );
      } else if (type == 2) {
        array = array.concat(
          (await this.presetLadderRepository.find({ where: { user: user } })).map(
            (preset) => new PresetLadderInfoDto(preset)
          )
        );
      } else if (type == 3) {
        array = array.concat(
          (await this.presetRouletteRepository.find({ where: { user: user } })).map(
            (preset) => new PresetRouletteInfoDto(preset)
          )
        );
      } else if (type == 4) {
        array = array.concat(
          (await this.presetHorseRepository.find({ where: { user: user } })).map(
            (preset) => new PresetHorseInfoDto(preset)
          )
        );
      }
    }

    return {
      result: array,
      message: 'success',
    };
  }

  async findOne(user_id: number, preset_id: number, type: number) {
    await this.usersService.checkUserExist({ id: user_id });
    const preset: Preset = await this.checkPresetExist(type, preset_id);

    let result: PresetInfoDto;
    if (type == 1) {
      result = new PresetLotteryInfoDto(preset as PresetLottery);
    } else if (type == 2) {
      result = new PresetLadderInfoDto(preset as PresetLadder);
    } else if (type == 3) {
      result = new PresetRouletteInfoDto(preset as PresetRoulette);
    } else if (type == 4) {
      result = new PresetHorseInfoDto(preset as PresetHorse);
    }

    return {
      result,
      message: 'success',
    };
  }

  async create(
    user_id: number,
    createPresetDto: CreatePresetDto
  ): Promise<CommonResponse<PresetInfoDto>> {
    const user = await this.usersService.checkUserExist({ id: user_id });

    let result: PresetInfoDto;

    if (createPresetDto.type == 1) {
      const createPresetLotteryDto = createPresetDto as CreatePresetLotteryDto;
      const presetLottery = new PresetLottery();
      presetLottery.user = user;
      presetLottery.title = createPresetLotteryDto.title;
      presetLottery.number = createPresetLotteryDto.number;
      presetLottery.wins = createPresetLotteryDto.wins;
      presetLottery.content = createPresetLotteryDto.content.join(',');
      result = new PresetLotteryInfoDto(await this.presetLotteryRepository.save(presetLottery));
    } else if (createPresetDto.type == 2) {
      const createPresetLadderDto = createPresetDto as CreatePresetLadderDto;
      const presetLadder = new PresetLadder();
      presetLadder.user = user;
      presetLadder.title = createPresetLadderDto.title;
      presetLadder.number = createPresetLadderDto.number;
      presetLadder.topContent = createPresetLadderDto.topContent.join(',');
      presetLadder.bottomContent = createPresetLadderDto.bottomContent.join(',');
      result = new PresetLadderInfoDto(await this.presetLadderRepository.save(presetLadder));
    } else if (createPresetDto.type == 3) {
      const createPresetRouletteDto = createPresetDto as CreatePresetRouletteDto;
      const presetRoulette = new PresetRoulette();
      presetRoulette.user = user;
      presetRoulette.title = createPresetRouletteDto.title;
      presetRoulette.number = createPresetRouletteDto.number;
      presetRoulette.content = createPresetRouletteDto.content.join(',');
      result = new PresetRouletteInfoDto(await this.presetRouletteRepository.save(presetRoulette));
    } else if (createPresetDto.type == 4) {
      const createPresetHorseDto = createPresetDto as CreatePresetHorseDto;
      const presetHorse = new PresetHorse();
      presetHorse.user = user;
      presetHorse.title = createPresetHorseDto.title;
      presetHorse.number = createPresetHorseDto.number;
      presetHorse.content = createPresetHorseDto.content.join(',');
      result = new PresetHorseInfoDto(await this.presetHorseRepository.save(presetHorse));
    }

    return {
      result,
      message: 'success',
    };
  }

  async delete(user_id: number, preset_id: number, type: number) {
    await this.usersService.checkUserExist({ id: user_id });
    await this.checkPresetExist(type, preset_id);

    if (type == 1) {
      this.presetLotteryRepository.delete({ id: preset_id });
    } else if (type == 2) {
      this.presetLadderRepository.delete({ id: preset_id });
    } else if (type == 3) {
      this.presetRouletteRepository.delete({ id: preset_id });
    } else if (type == 4) {
      this.presetHorseRepository.delete({ id: preset_id });
    }

    return {
      message: 'success',
    };
  }
}
