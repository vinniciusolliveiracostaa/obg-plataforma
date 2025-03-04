import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";



@Entity('user_roles')
export class UserRole {
  @PrimaryColumn({type: 'varchar', unique: true, nullable: false})
  id: string;

  @Column({type: 'varchar', nullable: false})
  name: string;

  @Column({type: 'json', nullable: false})
  permissions: JSON;

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id'})
  userId: User["id"];

  constructor(partial: Partial<UserRole>) {
    Object.assign(this, partial);
  }
}