import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Percentage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;
}
