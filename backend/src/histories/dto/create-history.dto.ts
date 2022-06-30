import { CreateHistoryHorseDto } from './create-history-horse.dto';
import { CreateHistoryLadderDto } from './create-history-ladder.dto';
import { CreateHistoryLotteryDto } from './create-history-lottery.dto';
import { CreateHistoryRouletteDto } from './create-history-roulette.dto';

export type CreateHistoryDto =
  | CreateHistoryLotteryDto
  | CreateHistoryLadderDto
  | CreateHistoryRouletteDto
  | CreateHistoryHorseDto;
