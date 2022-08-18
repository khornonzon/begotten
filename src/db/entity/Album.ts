import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  albumTitle: string;

  @Column()
  zhopas: string;

  @Column()
  theme: string;

  @Column()
  description: string;
}