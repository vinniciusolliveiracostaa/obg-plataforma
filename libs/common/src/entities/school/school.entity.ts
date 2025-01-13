import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Student } from '../students/students.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Team } from '../teams/teams.entity';

@Entity()
export class School {
    @PrimaryGeneratedColumn({ name: 'schoolId', type: 'int' })
    id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column({ type: 'varchar', length: 8, unique: true })
    inepCode: string;

    @Column({ type: 'char' })
    ufCode: string;

    @Column()
    city: string;

    @Column({ type: 'enum', enum: [ 'RURAL', 'URBANA' ] })
    location: 'RURAL' | 'URBANA';

    @Column()
    locality: string;

    @Column({ type: 'enum', enum: [ 'PUBLICA', 'PRIVADA' ] })
    admCategory: 'PUBLICA' | 'PRIVADA';

    @Column()
    serviceRestriction: string;

    @Column()
    address: string;

    @Column({ type: 'enum', enum: [ 'FEDERAL', 'ESTADUAL', 'MUNICIPAL', 'PRIVADA' ] })
    admDependency: 'FEDERAL' | 'ESTADUAL' | 'MUNICIPAL' | 'PRIVADA';

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

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @OneToMany(() => Student, student => student.school)
    students: Student[]

    @OneToMany(() => Teacher, teacher => teacher.school)
    teachers: Teacher[]

    @OneToMany(() => Team, team => team.school)
    teams: Team[]
}