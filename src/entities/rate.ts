import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { PointOfInterest } from "./pointOfInterest";
import { User } from "./user";

export enum rateNumbers {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

@ObjectType()
@Entity()
export class Rate {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: "enum",
    enum: rateNumbers,
    default: rateNumbers.FOUR,
  })
  rate: rateNumbers;

  @Field()
  @Column({ type: "timestamp", nullable: true })
  createDate: Date;

  @Field({ nullable: true })
  @Column({ type: "timestamp", nullable: true })
  updateDate: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.rates)
  public user: User;

  @Field(() => PointOfInterest)
  @ManyToOne(() => PointOfInterest, (pointOfInterest) => pointOfInterest.rates)
  public pointOfInterest: PointOfInterest;
}
