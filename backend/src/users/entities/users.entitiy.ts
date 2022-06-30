import { Group } from 'src/groups/entities/groups.entitiy';
import { HistoryLottery } from 'src/histories/entities/historyLottery.entity';
import { HistoryLadder } from 'src/histories/entities/historyLadder.entity';
import { HistoryRoulette } from 'src/histories/entities/historyRoulette.entity';
import { HistoryHorse } from 'src/histories/entities/historyHorse.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PresetLottery } from 'src/presets/entities/presetLottery.entity';
import { PresetLadder } from 'src/presets/entities/presetLadder.entity';
import { PresetHorse } from 'src/presets/entities/presetHorse.entity';
import { PresetRoulette } from 'src/presets/entities/presetRoulette.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: '255', unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: '255', nullable: false })
  password: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  imageUrl: string;

  @OneToMany(() => Group, (group) => group.user)
  groups: Group[];

  @OneToMany(() => HistoryLottery, (historyLottery) => historyLottery.user)
  historyLotteries: HistoryLottery[];

  @OneToMany(() => HistoryLadder, (historyLadder) => historyLadder.user)
  historyLadders: HistoryLadder[];

  @OneToMany(() => HistoryHorse, (historyHorse) => historyHorse.user)
  historyHorses: HistoryHorse[];

  @OneToMany(() => HistoryRoulette, (historyRoulette) => historyRoulette.user)
  historyRoulettes: HistoryRoulette[];

  @OneToMany(() => PresetLottery, (presetLottery) => presetLottery.user)
  presetLotteries: PresetLottery[];

  @OneToMany(() => PresetLadder, (presetLadder) => presetLadder.user)
  presetLadders: PresetLadder[];

  @OneToMany(() => HistoryHorse, (presetHorse) => presetHorse.user)
  presetHorses: PresetHorse[];

  @OneToMany(() => PresetRoulette, (presetRoulette) => presetRoulette.user)
  presetRoulettes: PresetRoulette[];
}
