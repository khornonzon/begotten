import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {User} from "./User"
@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  user_token_id: number;

  @Column({nullable: true})
  user_id: number;

  @Column({nullable: true})
  token: string;

  @Column({nullable: true})
  ip: string;

  @ManyToOne(()=>User, (user)=>user.tokens)
  user: User
}