import { School } from "../../entities/schools/schools.entity";
import { Student } from "../../entities/students/students.entity";
import { Teacher } from "../../entities/teachers/teachers.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('teams')
export class Team {
    @PrimaryGeneratedColumn()
    id: number;
}