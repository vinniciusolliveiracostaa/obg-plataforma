import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("teachers")
export class Teacher {
  @PrimaryColumn({ type: "varchar", unique: true, nullable: false })
  id: string;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false })
  cpf: string;

  @Column({ type: "varchar", nullable: false })
  phone: string;

  @Column({ type: "varchar", nullable: false })
  userId: string;

  @Column({ type: "varchar", nullable: false })
  schoolId: string;

  constructor(partial: Partial<Teacher>) {
    Object.assign(this, partial);
  }
}
