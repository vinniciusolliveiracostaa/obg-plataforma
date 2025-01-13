import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Student } from '../students/students.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Team } from '../teams/teams.entity';


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

@Entity()
export class School {
    @PrimaryGeneratedColumn({ name: 'schoolId', type: 'int' })
    id: number;

    @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @Column({ type: 'varchar', length: 8, unique: true })
    inepCode: string;

    @Column({ type: 'char', length: 2 })
    ufCode: string;

    @Column()
    city: string;

    @Column({ type: 'enum', enum: Location })
    location: Location;

    @Column()
    locality: string;

    @Column({ type: 'enum', enum: AdmCategory })
    admCategory: AdmCategory;

    @Column()
    serviceRestriction: string;

    @Column()
    address: string;

    @Column({ type: 'enum', enum: AdmDependency })
    admDependency: AdmDependency;

    @Column()
    privCategory: string;

    @Column()
    publicAuthorityPartner: string;

    @Column()
    regulation: string;

    @Column()
    carry: string;

    @Column()
    teachingStageModality: string;

    @Column()
    otherOffers: string;

    @Column({ type: 'float' })
    latitude: number;

    @Column({ type: 'float' })
    longitude: number;

    @OneToMany(() => Student, student => student.school)
    students: Student[]

    @OneToMany(() => Teacher, teacher => teacher.school)
    teachers: Teacher[]

    @OneToMany(() => Team, team => team.school)
    teams: Team[]
}