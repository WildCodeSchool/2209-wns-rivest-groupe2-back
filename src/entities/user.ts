import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Comment } from "./comment";
import { Rate } from "./rate";
import { Favorite } from "./favorite";

export enum UserType {
  SUPERADMIN = "superAdmin",
  ADMINCITY = "adminCity",
  SUPERUSER = "superUser",
  PAIDUSER = "paidUser",
  FREEUSER = "freeUser",
}

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  username: string;

  @Field({ nullable: true })
  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.FREEUSER,
    nullable: true,
  })
  type: UserType;

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
  @Column({ type: 'boolean', default: false })
  public isVerified: boolean;

  @Field()
  @Column()
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
}

