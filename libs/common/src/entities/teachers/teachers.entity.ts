import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { School } from '../schools/schools.entity';
import { Person } from '../common/person/person.entity';
import { Team } from '../../entities/teams/teams.entity';

@Entity()
export class Teacher extends Person {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date
    
    constructor(theacher: Partial<Teacher>) {
        super();
        Object.assign(this, theacher);
    }
}