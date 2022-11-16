import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Timestamp,
  ManyToOne,
  Index,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Point } from "geojson";
import { City } from "./city";
import { Comment } from "./comment";
import { Rate } from "./rate";

export enum POIType {
  RESTAURANT = "restaurant",
  PLACEOFRELIGION = "lieu de culte",
  MUSEUM = "musée",
}

export interface LocationType {
  type: "Point";
  coordinates: [0, 0];
}

export enum days {
  MONDAY = "lundi",
  TUESDAY = "mardi",
  WEDNESDAY = "mercredi",
  THURSDAY = "jeudi",
  FRIDAY = "vendredi",
  SATURDAY = "samedi",
  SUNDAY = "dimache",
}

@ObjectType()
@Entity()
export class PointOfInterest {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  postal: string;

  @Field()
  @Column({
    type: "enum",
    enum: POIType,
    default: POIType.RESTAURANT,
  })
  type: POIType;

  @Index({ spatial: true })
  @Column({
    type: "geometry",
  })
  localisation: string;

  @Field()
  @Column({ type: "timestamp", nullable: true })
  creationDate: Date;

  @Field()
  @Column()
  pictureUrl: string;

  @Field()
  @Column()
  websiteURL: string;

  @Field()
  @Column({
    type: "enum",
    enum: days,
  })
  dayOfWeek: days;

  @Field()
  @Column()
  openTime: string;

  @Field()
  @Column()
  closeTime: string;

  @Field()
  @Column()
  isClosed: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  priceRange: number;

  @ManyToOne(() => City, (city) => city.pointsOfInterest)
  public city: City;

  @OneToMany(() => Comment, (comment) => comment.pointOfInterest)
  public comments!: Comment[];

  @OneToMany(() => Rate, (rate) => rate.pointOfInterest)
  public rates!: Rate[];
}
