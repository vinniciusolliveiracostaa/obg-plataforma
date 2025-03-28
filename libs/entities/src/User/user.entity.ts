import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn({ type: "varchar", unique: true, nullable: false })
  id: string;

  @Column({ type: "varchar", nullable: false, unique: false })
  firstName: string;

  @Column({ type: "varchar", nullable: false, unique: false })
  lastName: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
