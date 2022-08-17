import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  filename: string;

  @Column({nullable: true})
  views: number;

  @Column({nullable: true})
  isPublished: boolean;
}
