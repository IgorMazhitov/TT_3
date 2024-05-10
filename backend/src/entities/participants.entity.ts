import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Participants {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    familyName: string;

    @Column()
    participation: number;
}