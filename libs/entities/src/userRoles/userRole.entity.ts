import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";




@Entity('user_roles')
export class UserRole {
  @PrimaryColumn({type: 'varchar', unique: true, nullable: false})
  id: string;

  @Column({type: 'varchar', nullable: false, unique: true})
  name: string;

  @Column({type: 'json', nullable: false})
  permissions: JSON;

  constructor(partial: Partial<UserRole>) {
    Object.assign(this, partial);
  }
}