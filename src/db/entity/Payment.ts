import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { DateTemplate } from "./templates/DateTemplate";
import { User } from "./User";
import { UserToken } from "./UserToken";
import { Commune } from "./Commune";

@Entity()
export class Payment extends DateTemplate {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  commune_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  payment_sum: number;

  @ManyToOne(() => User, (user) => user.payments, { cascade: true })
  user: User;

  @ManyToOne(() => Commune, (commune) => commune.payments, { cascade: true })
  commune: Commune;
}
