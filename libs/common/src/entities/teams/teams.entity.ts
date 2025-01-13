import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { School } from "../school/school.entity";
import { Teacher } from "../teacher/teacher.entity";
import { Student } from "../students/students.entity";


@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', width: 5 })
    @Generated('increment')
    teamNumber: number;

    // Uma equipe pertence a uma escola
    @ManyToOne(() => School, school => school.teams, { nullable: false })
    school: School;

    // Uma equipe tem um professor responsável
    @ManyToOne(() => Teacher, teacher => teacher.teams, { nullable: false })
    teacher: Teacher;

    // Uma equipe tem exatamente 3 alunos
    @OneToMany(() => Student, student => student.team)
    students: Student[];
}
