import { Column, Entity, PrimaryColumn } from "typeorm";



@Entity('schools')
export class School {
    @PrimaryColumn({type: 'varchar', unique: true, nullable: false})
    id: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    userId: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    inep: string;

    constructor(partial: Partial<School>) {
        Object.assign(this, partial);
    }
}