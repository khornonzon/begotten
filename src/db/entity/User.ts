import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn, JoinTable } from "typeorm";
import { Commune } from "./Commune";
import { DirectDebt } from "./DirectDebt";
import { DateTemplate } from "./templates/DateTemplate";
import {UserToken} from "./UserToken"
import { Payment } from "./Payment";


@Entity()
export class User extends DateTemplate {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  surname: string;

  @Column({nullable: true})
  password: string;

  @OneToMany(()=>UserToken, (user)=>user.user)
  tokens: UserToken[];

  @OneToMany(()=>DirectDebt, (direct_debt)=>direct_debt.lender_user)
  lends: DirectDebt[]

  @OneToMany(()=>DirectDebt, (direct_debt)=>direct_debt.borrower_user)
  borrows: DirectDebt[]

  @OneToMany(()=>Payment, (payment)=>payment.user)
  payments: Payment[]

  @OneToMany(()=>Commune, (commune)=>commune.creator)
  created_communes: Payment[]

  @ManyToMany(()=>Commune)
  @JoinTable()
  communes: Commune[]
}
