import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Climb_log } from "../climb-logs/climb-logs.entity";

@Entity()
export class Boulder {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    grade:string;

    @Column()
    description: string;

    @OneToMany(() => Climb_log, (climbLog) => climbLog.boulder, {
        cascade:true
    })
    climbLogs: Climb_log[]
}