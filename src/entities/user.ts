import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Comment } from "./comment";
import { Rate } from "./rate";
// import { Image } from "./image";

export enum UserType {
  ADMIN = "admin",
  FREEUSER = "free user",
  PAIDUSER = "paid user",
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

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  hashedPassword: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profilePicture: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  public comments!: Comment[];

  @OneToMany(() => Rate, (rate) => rate.user)
  public rates!: Rate[];
}
