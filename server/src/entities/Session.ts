import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "sessions" })
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;

  @Column({ name: "created_at" })
  createdAt: number;

  @Column({ name: "updated_at", nullable: true })
  updatedAt: number;

  @BeforeInsert()
  public setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000);
  }

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}
