import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PresetHorse } from './entities/presetHorse.entity';
import { PresetLadder } from './entities/presetLadder.entity';
import { PresetLottery } from './entities/presetLottery.entity';
import { PresetRoulette } from './entities/presetRoulette.entity';
import { PresetsController } from './presets.controller';
import { PresetsService } from './presets.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([PresetLottery, PresetLadder, PresetRoulette, PresetHorse]),
  ],
  controllers: [PresetsController],
  providers: [PresetsService],
})
export class PresetsModule {}
