import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { DateTemplate } from "./templates/DateTemplate";
import { User } from "./User";
import {UserToken} from "./UserToken"

@Entity()
export class Commune extends DateTemplate {
  @PrimaryGeneratedColumn()
  commune_id: number;

  @ManyToMany(()=>User)
  users: User[];
}
