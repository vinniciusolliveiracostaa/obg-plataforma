import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum Role {
    ADMIN = 'admin',
    SCHOOL = 'school',
    TEACHER = 'teacher',
    STUDENT = 'student'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', nullable: false })
    name: string

    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string

    @Column({ type: 'varchar', nullable: false })
    password: string

    @Column({ type: 'enum', enum: Role, nullable: false })
    role: Role

    @Column({ type: 'uuid', nullable: true })
    roleId: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    constructor(user: Partial<User>) {
        Object.assign(this, user);
    }
}