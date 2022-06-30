import { CreatePresetHorseDto } from './create-preset-horse.dto';
import { CreatePresetLadderDto } from './create-preset-ladder.dto';
import { CreatePresetLotteryDto } from './create-preset-lottery.dto';
import { CreatePresetRouletteDto } from './create-preset-roulette.dto';

export type CreatePresetDto =
  | CreatePresetLotteryDto
  | CreatePresetLadderDto
  | CreatePresetRouletteDto
  | CreatePresetHorseDto;
