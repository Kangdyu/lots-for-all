import { HistoryHorseInfoDto } from './history-horse-info.dto';
import { HistoryLadderInfoDto } from './history-ladder-info.dto';
import { HistoryLotteryInfoDto } from './history-lottery-info.dto';
import { HistoryRouletteInfoDto } from './history-roulette-info.dto';

export type HistoryInfoDto =
  | HistoryLotteryInfoDto
  | HistoryLadderInfoDto
  | HistoryRouletteInfoDto
  | HistoryHorseInfoDto;
