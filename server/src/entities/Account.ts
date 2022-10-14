import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "accounts" })
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  provider: string;

  @Column({ name: "provider_account_id" })
  providerAccountId: string;

  @Column({ name: "refresh_token" })
  refreshToken: string;

  @Column({ name: "access_token" })
  accessToken: string;

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
