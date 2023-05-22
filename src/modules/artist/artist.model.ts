import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
