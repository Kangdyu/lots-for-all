import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
