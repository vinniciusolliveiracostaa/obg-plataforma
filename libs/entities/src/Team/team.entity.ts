import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("teams")
export class Team {
  @PrimaryColumn({ type: "varchar", unique: true, nullable: false })
  id: string;

  @Column({ type: "varchar", nullable: false, unique: false })
  name: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  description: string;

  @Column({ type: "varchar", nullable: false, unique: true, array: true })
  students: string[];

  @Column({ type: "varchar", nullable: false, unique: true })
  schoolId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Team>) {
    Object.assign(this, partial);
  }
}
