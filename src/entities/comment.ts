import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./user";
import { PointOfInterest } from "./pointOfInterest";

@ObjectType()
@Entity()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public userId!: number;

  @Column()
  public pointOfInterestId!: number;

  @Field({ nullable: true })
  @Column({ type: "timestamp", nullable: true })
  createDate: Date;

  @Field({ nullable: true })
  @Column({ type: "timestamp", nullable: true })
  updateDate: Date;

  @Field()
  @Column()
  text: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;

  @ManyToOne(
    () => PointOfInterest,
    (pointOfInterest) => pointOfInterest.comments
  )
  public pointOfInterest!: PointOfInterest;
}
