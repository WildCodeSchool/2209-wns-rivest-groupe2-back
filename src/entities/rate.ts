import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { PointOfInterest } from "./pointOfInterest";
import { User } from "./user";

export enum rate {
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
    enum: rate,
    default: 4,
  })
  rate: rate;

  @Field()
  @Column({ type: "timestamp", nullable: true })
  creationDate: Date;

  @Field()
  @Column({ type: "timestamp", nullable: true })
  updateDate: Date;

  @ManyToOne(() => User, (user) => user.rates)
  public user!: User;

  @ManyToOne(() => PointOfInterest, (pointOfInterest) => pointOfInterest.rates)
  public pointOfInterest!: PointOfInterest;
}
