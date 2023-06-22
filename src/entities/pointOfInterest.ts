import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Comment } from "./comment";
import { Rate } from "./rate";
import { Point } from "geojson";
import { IPoi } from "../interfaces/IPoi";
import { Favorite } from "./favorite";

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
    if (
      this.rates === null ||
      this.rates === undefined ||
      this.rates.length === 0
    ) {
      return null;
    }

    const sum = this.rates.reduce(
      (acc: number, rate: Rate) => acc + rate.rate,
      0
    );
    const average = sum / this.rates.length;

    return Number(average.toFixed(1));
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

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.pointOfInterest)
  public comments: Comment[];

  @Field(() => [Rate], { nullable: true })
  @OneToMany(() => Rate, (rate) => rate.pointOfInterest)
  public rates: Rate[];

  @Field(() => [Favorite], { nullable: true })
  @OneToMany(() => Favorite, (favorite) => favorite.pointOfInterest)
  public favorites: Favorite[];
}
