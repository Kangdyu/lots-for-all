import { PresetHorseInfoDto } from './preset-horse-info.dto';
import { PresetLadderInfoDto } from './preset-ladder-info.dto';
import { PresetLotteryInfoDto } from './preset-lottery-info.dto';
import { PresetRouletteInfoDto } from './preset-roulette-info.dto';

export type PresetInfoDto =
  | PresetLotteryInfoDto
  | PresetLadderInfoDto
  | PresetRouletteInfoDto
  | PresetHorseInfoDto;
