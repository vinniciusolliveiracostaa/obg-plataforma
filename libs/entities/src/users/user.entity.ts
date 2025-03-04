import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Domains } from '@repo/common/index';
import { UserRole } from '../userRoles/userRole.entity';



@Entity('users')
export class User {
  @PrimaryColumn({type: 'varchar', unique: true, nullable: false})
  id: string;

  @Column({type: 'varchar', nullable: false})
  firstName: string;

  @Column({type: 'varchar', nullable: false})
  lastName: string;

  @Column({type: 'varchar', nullable: false})
  email: string;

  @Column({type: 'varchar', nullable: false})
  password: string;

  @Column({type: 'enum', enum: Domains, default: [], array: true, nullable: false})
  domainGroup: Domains[];

  @Column({type: 'varchar', nullable: false})
  roleId: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}