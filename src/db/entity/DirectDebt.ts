import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Commune } from "./Commune";
import { DateTemplate } from "./templates/DateTemplate";
import { User } from "./User";
import { UserToken } from "./UserToken";

@Entity()
export class DirectDebt extends DateTemplate {
  @PrimaryGeneratedColumn()
  direct_debt_id: number;

  @Column({ nullable: true })
  lender_id: number;

  @Column({ nullable: true })
  borrower_id: number;

  @Column({ nullable: true })
  debt_sum: number;

  @Column({ nullable: true })
  commune_id: number;

  @ManyToOne(() => User, (user) => user.lends)
  lender_user: User;

  @ManyToOne(() => User, (user) => user.borrows)
  borrower_user: User;

  @ManyToOne(() => Commune, (commune) => commune.debts)
  commune: Commune;
}
