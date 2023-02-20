import { Climb_log } from "src/climb-logs/climb-logs.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Climb_log, (climbLog) => climbLog.climber)
    climbLogs: Climb_log[]
}