import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Teacher } from "../../entities/teachers/teachers.entity";
import { Student } from "../../entities/students/students.entity";
import { User } from "../../entities/users/users.entity";
import { Team } from "../../entities/teams/teams.entity";

export enum Location {
    RURAL = 'RURAL',
    URBANA = 'URBANA'
}

export enum AdmCategory {
    PUBLICA = 'PUBLICA',
    PRIVADA = 'PRIVADA'
}

export enum AdmDependency {
    FEDERAL = 'FEDERAL',
    ESTADUAL = 'ESTADUAL',
    MUNICIPAL = 'MUNICIPAL',
    PRIVADA = 'PRIVADA'
}

@Entity('schools')
export class School {
    @PrimaryGeneratedColumn('uuid')
    id: string;
/*
    @Column({ type: 'int', unique: true, nullable: false })
    inep: number;

    @Column({ type: 'char', length: 2, nullable: false })
    uf: string;

    @Column({ type: 'varchar', nullable: false })
    city: string;

    @Column({ type: 'enum', enum: Location, nullable: false })
    location: Location;

    @Column({ type: 'varchar', nullable: false })
    locality: string;

    @Column({ type: 'enum', enum: AdmCategory })
    admCategory: AdmCategory;

    @Column({ type: 'varchar', nullable: false })
    serviceRestriction: string;

    @Column({ type: 'varchar', nullable: false })
    address: string;

    @Column({ type: 'enum', enum: AdmDependency, nullable: false })
    admDependency: AdmDependency;

    @Column({ type: 'varchar', nullable: false })
    privCategory: string;

    @Column({ type: 'varchar', nullable: false })
    publicAuthorityPartner: string;

    @Column({ type: 'varchar', nullable: false })
    regulation: string;

    @Column({ type: 'varchar', nullable: false })
    carry: string;

    @Column({ type: 'varchar', nullable: false })
    teachingStageModality: string;

    @Column({ type: 'varchar', nullable: false })
    otherOffers: string;

    @Column({ type: 'float', nullable: false })
    latitude: number;

    @Column({ type: 'float', nullable: false })
    longitude: number;
*/
    @Column({ type: 'uuid', nullable: true })
    userId: string

    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date
    

    constructor(school: Partial<School>) {
        Object.assign(this, school);
    }
}