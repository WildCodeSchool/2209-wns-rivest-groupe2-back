import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { City } from "./city";
import { Comment } from "./comment";
import { Rate } from "./rate";
import { Point } from "geojson";
import { Day } from "./day";
import { IPoi } from "../interfaces/IPoi";

export enum POIType {
  RESTAURANT = "restaurant",
  PLACEOFRELIGION = "lieu de culte",
  MUSEUM = "musée",
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

  @Field(() => [Day], { nullable: true })
  @OneToMany(() => Day, (day) => day.pointOfInterest, {
    cascade: true,
  })
  days: Day[];

  @ManyToOne(() => City, (city) => city.pointOfInterest)
  public city: City;

  @OneToMany(() => Comment, (comment) => comment.pointOfInterest)
  public comments!: Comment[];

  @OneToMany(() => Rate, (rate) => rate.pointOfInterest)
  public rates!: Rate[];
}
