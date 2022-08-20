import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn, JoinTable } from "typeorm";
import { Commune } from "./Commune";
import { DateTemplate } from "./templates/DateTemplate";
import {UserToken} from "./UserToken"


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

  @ManyToMany(()=>Commune)
  @JoinTable()
  communes: Commune[]
}
