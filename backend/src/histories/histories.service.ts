import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateHistoryHorseDto } from './dto/create-history-horse.dto';
import { CreateHistoryLadderDto } from './dto/create-history-ladder.dto';
import { CreateHistoryLotteryDto } from './dto/create-history-lottery.dto';
import { CreateHistoryRouletteDto } from './dto/create-history-roulette.dto';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryHorseInfoDto } from './dto/history-horse-info.dto';
import { HistoryInfoDto } from './dto/history-info.dto';
import { HistoryLadderInfoDto } from './dto/history-ladder-info.dto';
import { HistoryLotteryInfoDto } from './dto/history-lottery-info.dto';
import { HistoryRouletteInfoDto } from './dto/history-roulette-info.dto';
import { HistoryHorse } from './entities/historyHorse.entity';
import { HistoryLadder } from './entities/historyLadder.entity';
import { HistoryLottery } from './entities/historyLottery.entity';
import { HistoryRoulette } from './entities/historyRoulette.entity';

type History = HistoryLottery | HistoryLadder | HistoryRoulette | HistoryHorse;

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(HistoryLottery) private historyLotteryRepository: Repository<HistoryLottery>,
    @InjectRepository(HistoryLadder) private historyLadderRepository: Repository<HistoryLadder>,
    @InjectRepository(HistoryRoulette)
    private historyRouletteRepository: Repository<HistoryRoulette>,
    @InjectRepository(HistoryHorse) private historyHorseRepository: Repository<HistoryHorse>,
    private readonly usersService: UsersService
  ) {}

  private async checkHistoryExist(type: number, history_id: number): Promise<History> {
    let history: History;

    if (type == 1) {
      history = await this.historyLotteryRepository.findOneBy({ id: history_id });
    } else if (type == 2) {
      history = await this.historyLadderRepository.findOneBy({ id: history_id });
    } else if (type == 3) {
      history = await this.historyRouletteRepository.findOneBy({ id: history_id });
    } else if (type == 4) {
      history = await this.historyHorseRepository.findOneBy({ id: history_id });
    }

    if (!history) {
      throw new BadRequestException('Cannot find history');
    }
    return history;
  }

  async find(user_id: number, type?: number): Promise<CommonResponse<HistoryInfoDto[]>> {
    const user = await this.usersService.checkUserExist({ id: user_id });

    let array: HistoryInfoDto[] = [];
    if (!type) {
      array = array.concat(
        (await this.historyLotteryRepository.find({ where: { user: user } })).map(
          (history) => new HistoryLotteryInfoDto(history)
        )
      );
      array = array.concat(
        (await this.historyLadderRepository.find({ where: { user: user } })).map(
          (history) => new HistoryLadderInfoDto(history)
        )
      );
      array = array.concat(
        (await this.historyRouletteRepository.find({ where: { user: user } })).map(
          (history) => new HistoryRouletteInfoDto(history)
        )
      );
      array = array.concat(
        (await this.historyHorseRepository.find({ where: { user: user } })).map(
          (history) => new HistoryHorseInfoDto(history)
        )
      );
    } else {
      if (type == 1) {
        array = array.concat(
          (await this.historyLotteryRepository.find({ where: { user: user } })).map(
            (history) => new HistoryLotteryInfoDto(history)
          )
        );
      } else if (type == 2) {
        array = array.concat(
          (await this.historyLadderRepository.find({ where: { user: user } })).map(
            (history) => new HistoryLadderInfoDto(history)
          )
        );
      } else if (type == 3) {
        array = array.concat(
          (await this.historyRouletteRepository.find({ where: { user: user } })).map(
            (history) => new HistoryRouletteInfoDto(history)
          )
        );
      } else if (type == 4) {
        array = array.concat(
          (await this.historyHorseRepository.find({ where: { user: user } })).map(
            (history) => new HistoryHorseInfoDto(history)
          )
        );
      }
    }

    return {
      result: array,
      message: 'success',
    };
  }

  async findOne(user_id: number, history_id: number, type: number) {
    await this.usersService.checkUserExist({ id: user_id });
    const history: History = await this.checkHistoryExist(type, history_id);

    let result: HistoryInfoDto;
    if (type == 1) {
      result = new HistoryLotteryInfoDto(history as HistoryLottery);
    } else if (type == 2) {
      result = new HistoryLadderInfoDto(history as HistoryLadder);
    } else if (type == 3) {
      result = new HistoryRouletteInfoDto(history as HistoryRoulette);
    } else if (type == 4) {
      result = new HistoryHorseInfoDto(history as HistoryHorse);
    }

    return {
      result,
      message: 'success',
    };
  }

  async create(
    user_id: number,
    createHistoryDto: CreateHistoryDto
  ): Promise<CommonResponse<HistoryInfoDto>> {
    const user = await this.usersService.checkUserExist({ id: user_id });

    let result: HistoryInfoDto;

    if (createHistoryDto.type == 1) {
      const createHistoryLotteryDto = createHistoryDto as CreateHistoryLotteryDto;
      const historyLottery = new HistoryLottery();
      historyLottery.user = user;
      historyLottery.title = createHistoryLotteryDto.title;
      historyLottery.number = createHistoryLotteryDto.number;
      historyLottery.wins = createHistoryLotteryDto.wins;
      historyLottery.content = createHistoryLotteryDto.content.join(',');
      historyLottery.result = createHistoryLotteryDto.result.join(',');
      result = new HistoryLotteryInfoDto(await this.historyLotteryRepository.save(historyLottery));
    } else if (createHistoryDto.type == 2) {
      const createHistoryLadderDto = createHistoryDto as CreateHistoryLadderDto;
      const historyLadder = new HistoryLadder();
      historyLadder.user = user;
      historyLadder.title = createHistoryLadderDto.title;
      historyLadder.number = createHistoryLadderDto.number;
      historyLadder.topContent = createHistoryLadderDto.topContent.join(',');
      historyLadder.bottomContent = createHistoryLadderDto.bottomContent.join(',');
      historyLadder.result = createHistoryLadderDto.result.join(',');
      result = new HistoryLadderInfoDto(await this.historyLadderRepository.save(historyLadder));
    } else if (createHistoryDto.type == 3) {
      const createHistoryRouletteDto = createHistoryDto as CreateHistoryRouletteDto;
      const historyRoulette = new HistoryRoulette();
      historyRoulette.user = user;
      historyRoulette.title = createHistoryRouletteDto.title;
      historyRoulette.number = createHistoryRouletteDto.number;
      historyRoulette.content = createHistoryRouletteDto.content.join(',');
      historyRoulette.result = createHistoryRouletteDto.result;
      result = new HistoryRouletteInfoDto(
        await this.historyRouletteRepository.save(historyRoulette)
      );
    } else if (createHistoryDto.type == 4) {
      const createHistoryHorseDto = createHistoryDto as CreateHistoryHorseDto;
      const historyHorse = new HistoryHorse();
      historyHorse.user = user;
      historyHorse.title = createHistoryHorseDto.title;
      historyHorse.number = createHistoryHorseDto.number;
      historyHorse.content = createHistoryHorseDto.content.join(',');
      historyHorse.result = createHistoryHorseDto.result.join(',');
      result = new HistoryHorseInfoDto(await this.historyHorseRepository.save(historyHorse));
    }

    return {
      result,
      message: 'success',
    };
  }

  async delete(user_id: number, history_id: number, type: number) {
    console.log(typeof user_id);
    console.log(typeof history_id);
    console.log(typeof type);
    await this.usersService.checkUserExist({ id: user_id });
    await this.checkHistoryExist(type, history_id);

    if (type == 1) {
      this.historyLotteryRepository.delete({ id: history_id });
    } else if (type == 2) {
      this.historyLadderRepository.delete({ id: history_id });
    } else if (type == 3) {
      this.historyRouletteRepository.delete({ id: history_id });
    } else if (type == 4) {
      this.historyHorseRepository.delete({ id: history_id });
    }

    return {
      message: 'success',
    };
  }
}
