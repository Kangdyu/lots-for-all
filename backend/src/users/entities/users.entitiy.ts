import { Group } from 'src/groups/entities/groups.entitiy';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
