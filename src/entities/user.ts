import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Comment } from "./comment";
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

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.FREEUSER,
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

  @Field(() => [Favorite])
  @OneToMany(() => Favorite, (favorite) => favorite.user, {
    onDelete: "CASCADE",
    eager: true,
  })
  favorites: Favorite[];
}
