import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Climber {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName:string

    @Column()
    surname: string;
}