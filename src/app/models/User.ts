import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Profession from "./Profession";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @ManyToOne(() => Profession, (profession) => profession.id)
  @JoinColumn()
  IdProfession: Profession;
}

export default User;
