import { User } from 'src/users/entities/users.entitiy';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PresetRoulette {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.groups)
  @JoinColumn()
  user: User;

  @Column({ type: 'varchar', length: '255', nullable: false })
  title: string;

  @Column({ type: 'int', nullable: false })
  number: number;

  @Column({ type: 'text', nullable: false })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
