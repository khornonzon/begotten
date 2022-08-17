import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {User} from "./User"
@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  user_id: number;

  @Column({nullable: true})
  token: string;

  @ManyToOne(()=>User, (user)=>user.tokens)
  user: User
}