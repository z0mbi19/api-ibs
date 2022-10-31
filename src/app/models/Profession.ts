import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  OneToMany,
} from "typeorm";
import User from "./User";

@Entity("professions")
class Profession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.id)
  user: User;
}

export default Profession;
