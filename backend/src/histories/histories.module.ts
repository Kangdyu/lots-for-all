import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { HistoryLottery } from './entities/historyLottery.entity';
import { HistoryLadder } from './entities/historyLadder.entity';
import { HistoryRoulette } from './entities/historyRoulette.entity';
import { HistoryHorse } from './entities/historyHorse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([HistoryLottery, HistoryLadder, HistoryRoulette, HistoryHorse]),
  ],
  providers: [HistoriesService],
  controllers: [HistoriesController],
})
export class HistoriesModule {}
