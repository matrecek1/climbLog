import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}