import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { School } from '../school/school.entity';
import { Category } from '../common/caregories/categories.entity';
import { Person } from '../common/person/person.entity';
import { Team } from '../teams/teams.entity';

@Entity()
export class Teacher extends Person {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    user: User;

    @ManyToOne(() => School, school => school.teachers)
    @JoinColumn() 
    school: School

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @OneToMany(() => Team, team => team.teacher)
    teams: Team[]
}