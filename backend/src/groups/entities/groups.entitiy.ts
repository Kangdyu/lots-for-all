import { User } from 'src/users/entities/users.entitiy';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.groups)
  @JoinColumn()
  user: User;

  @Column({ type: 'text', nullable: true })
  members: string;
}
