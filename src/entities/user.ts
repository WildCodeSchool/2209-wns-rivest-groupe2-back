import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Comment } from "./comment";
import { Rate } from "./rate";
import { Favorite } from "./favorite";
import { Role } from "./role";
import { City } from "./city";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hashedPassword: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profilePicture?: string;

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
    eager: true,
  })
  comments: Comment[];

  @OneToMany(() => Rate, (rate) => rate.user, {
    cascade: true,
    eager: true,
  })
  rates: Rate[];

  @OneToMany(() => Favorite, (favorite) => favorite.user, {
    cascade: true,
    eager: true,
  })
  favorites: Favorite[];

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "role_id" })
  role: Role;

  @OneToMany(() => City, city => city.user) 
  cities: City[]; 
}
