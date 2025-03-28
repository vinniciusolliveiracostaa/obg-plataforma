import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity(`schools`)
export class School {
  @PrimaryColumn({ type: "varchar", unique: true, nullable: false })
  id: string;

  @Column({ type: "varchar", nullable: false, unique: false })
  name: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  inep: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  phone: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  cnpj: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<School>) {
    Object.assign(this, partial);
  }
}
