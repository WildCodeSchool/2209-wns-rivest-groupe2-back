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

export enum rateNumbers {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

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

  @Field()
  @Column({
    type: "enum",
    enum: rateNumbers,
    default: rateNumbers.FOUR,
  })
  rate: rateNumbers;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @ManyToOne(
    () => PointOfInterest,
    (pointOfInterest) => pointOfInterest.comments,
    { onDelete: "CASCADE" }
  )
  public pointOfInterest!: PointOfInterest;
}
