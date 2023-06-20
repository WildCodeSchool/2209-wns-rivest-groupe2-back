import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
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
  @Column()
  userId: number

  @Field()
  @Column()
  poiId: number

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

  @ManyToOne(() => User, (user) => user.rates)
  @JoinColumn()
  user: User;


  @Field(() => PointOfInterest)
  @ManyToOne(() => PointOfInterest, (pointOfInterest) => pointOfInterest.rates)
  public pointOfInterest: PointOfInterest;
}
