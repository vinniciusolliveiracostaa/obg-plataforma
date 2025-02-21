import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { Role } from "../../common/role.enum"

@Entity('users')
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'enum', enum: Role })
    roles: Role[];

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'varchar', nullable: true })
    avatar?: string;

    @Column({ type: 'boolean', default: false })
    isVerified: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}