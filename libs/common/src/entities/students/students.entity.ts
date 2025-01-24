import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from "../../entities/users/users.entity";
import { Person } from "../../entities/common/person/person.entity";
import { School } from "../../entities/schools/schools.entity";
import { Team } from "../../entities/teams/teams.entity";


export enum Status {
    ACTIVE = 'ATIVO',
    PAYMENT_PENDING = 'PAGAMENTO_PENDENTE',
    INACTIVE = 'INATIVO'
}

@Entity('students')
export class Student extends Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: false })
    serie: number;

    @Column({ type: "varchar", nullable: false })
    motherName: string;

    @Column({ type: "date", nullable: false })
    birthDate: Date;

    @Column({ type: "int", nullable: true })
    nis?: number;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    constructor(student: Partial<Student>) {
        super();
        Object.assign(this, student);
    }
}