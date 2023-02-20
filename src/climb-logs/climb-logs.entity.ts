import { Boulder } from "src/boulders/boulders.entity";
import { Climber } from "src/climbers/climbers.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Climb_log {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() =>Climber, (climber) => climber.climbLogs, {
        cascade:true
    })
    climber: Climber

    @ManyToOne(() => Boulder, (boulder) => boulder.climbLogs, {
        cascade: true
    })
    boulder: Boulder
}