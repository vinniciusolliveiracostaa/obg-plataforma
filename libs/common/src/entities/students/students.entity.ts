import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { User } from "../user/user.entity";
import { School } from "../school/school.entity";
import { Category } from "../common/caregories/categories.entity";
import { Person } from "../common/person/person.entity";
import { Team } from "../teams/teams.entity";

@Entity()
export class Student extends Person {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn({  name: 'userId' })
    user: User;

    @ManyToOne(() => School, school => school.students)
    @JoinColumn({ name: 'schoolId' }) 
    school: School

    @Column({ type: "int" })
    serie: number;

    @Column()
    motherName: string;

    @Column()
    brithDate: Date;

    @Column({ type: "int", length: 11, unique: true })
    nis: number;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => Team, team => team.students)
    @JoinColumn()
    team: Team;
}
