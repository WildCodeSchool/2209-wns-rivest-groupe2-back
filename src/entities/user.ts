import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Comment } from "./comment";
import { Rate } from "./rate";
import { PointOfInterest } from "./pointOfInterest";

export enum UserType {
  ADMIN = "admin",
  FREEUSER = "freeUser",
  PAIDUSER = "paidUser",
}

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
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

  @Field()
  @Column()
  hashedPassword: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profilePicture?: string;

  @ManyToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.raters)
  @JoinTable()
  ratedPOIs: PointOfInterest[];

  @OneToMany(() => Comment, (comment) => comment.user)
  public comments: Comment[];

  @OneToMany(() => Rate, (rate) => rate.user)
  public rates: Rate[];
}
