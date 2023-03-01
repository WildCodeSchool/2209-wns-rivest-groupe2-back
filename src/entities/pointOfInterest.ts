import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Comment } from "./comment";
import { Rate } from "./rate";
import { Point } from "geojson";
import { IPoi } from "../interfaces/IPoi";
import { User } from "./user";

export enum POIType {
  RESTAURANT = "restaurant",
  FASTFOOD = "fast-food",
  BAR = "bar",
  PLACEOFRELIGION = "lieu de culte",
  HOSTEL = "hotel",
  MUSEUM = "musee",
}

export enum priceRange {
  LOW = "$",
  MEDIUM = "$$",
  HIGH = "$$$",
}

@ObjectType()
@Entity()
export class PointOfInterest implements IPoi {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  postal: string;

  @Field({ nullable: true })
  @Column({
    type: "enum",
    enum: POIType,
    default: POIType.RESTAURANT,
    nullable: true,
  })
  type: POIType;

  @Field(() => [Number], { nullable: true })
  @Column("float", { array: true, nullable: true })
  coordinates: Point;

  @Field({ nullable: true })
  @Column({ type: "timestamp", nullable: true })
  creationDate: Date;

  @Field(() => Number, { nullable: true })
  public averageRate(): number | null {
    if (this.rates === null || this.rates === undefined || this.rates.length === 0) {
      return null;
    }

    const sum = this.rates.reduce((acc: number, rate: Rate) => acc + rate.rate, 0);
    const average = sum / this.rates.length;

    return Number(average.toFixed(1));
  }

  public addRate(rate: Rate): void {
    this.rates.push(rate);
  }



  @Field(() => [String], { nullable: true })
  @Column({ array: true, nullable: true })
  pictureUrl: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  websiteURL: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({
    nullable: true,
    type: "enum",
    enum: priceRange,
  })
  priceRange: priceRange;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field(() => [String], { nullable: true })
  @Column({ array: true, nullable: true })
  daysOpen: string;

  @Field(() => [String], { nullable: true })
  @Column({ array: true, nullable: true })
  hoursOpen: string;

  @Field(() => [String], { nullable: true })
  @Column({ array: true, nullable: true })
  hoursClose: string;

  /*   @ManyToOne(() => City, (city) => city.pointOfInterest)
  public city: City; */
  @ManyToMany(() => User, (user) => user.ratedPOIs)
  raters: User[];


  @OneToMany(() => Comment, (comment) => comment.pointOfInterest)
  public comments: Comment[];

  @OneToMany(() => Rate, (rate) => rate.pointOfInterest)
  public rates: Rate[];


}
