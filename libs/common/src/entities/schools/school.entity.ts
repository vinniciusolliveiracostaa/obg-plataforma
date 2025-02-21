import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('schools')
export class School {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: false })
    userId: string;

    @Column({ type: 'int', nullable: false, unique: true })
    inep: number;

    constructor(partial: Partial<School>) {
        Object.assign(this, partial);
    }
}