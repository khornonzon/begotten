import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {UserToken} from "./UserToken"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  surname: string;

  @Column({nullable: true})
  password: string;

  @OneToMany(()=>UserToken, (user)=>user.user)

  tokens: UserToken[]
}
