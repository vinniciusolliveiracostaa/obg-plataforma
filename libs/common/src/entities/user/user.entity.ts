import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


export enum UserRole {
    ADMIN = 'admin',
    SCHOOL = 'school',
    TEACHER = 'teacher',
    STUDENT = 'student',
    TEAM = 'team'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', length: 15 })
    tel: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(user: Partial<User>) {
        Object.assign(this, user);
    }
}