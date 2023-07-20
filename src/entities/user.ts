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
  @Column({ unique: true })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  uuid?: string;

  @Field()
  @Column({ type: "boolean", default: false })
  public isVerified: boolean;

  @Field()
  @Column()
  hashedPassword: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profilePicture?: string;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user, {
    onDelete: "CASCADE",
    eager: true,
  })
  comments: Comment[];

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

  @Field(() => City, { nullable: true })
  @ManyToOne(() => City, (city) => city.users, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "city_id" })
  city: City;
}
