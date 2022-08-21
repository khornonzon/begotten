import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { DateTemplate } from "./templates/DateTemplate";
import { User } from "./User";
import { UserToken } from "./UserToken";
import { DirectDebt } from "./DirectDebt";
import { Payment } from "./Payment";

@Entity()
export class Commune extends DateTemplate {
  @PrimaryGeneratedColumn()
  commune_id: number;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => DirectDebt, (direct_debt) => direct_debt.commune)
  debts: DirectDebt[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @ManyToOne(() => User, (user) => user.created_communes)
  creator: User;

  @ManyToMany(() => User)
  users: User[];
}
