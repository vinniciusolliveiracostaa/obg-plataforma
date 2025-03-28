import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("teachers")
export class Teacher {
  @PrimaryColumn({ type: "varchar", unique: true, nullable: false })
  id: string;

  @Column({ type: "varchar", nullable: false, unique: false })
  firstName: string;

  @Column({ type: "varchar", nullable: false, unique: false })
  lastName: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  phone: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  cpf: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Teacher>) {
    Object.assign(this, partial);
  }
}
