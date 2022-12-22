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

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourOpenMonday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourOpenThuesday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourOpenWenesday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourOpenThursday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourOpenFriday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourOpenSaturday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourOpenSunday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourCloseMonday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourCloseThuesday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourCloseWenesday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourCloseThursday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourCloseFriday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourCloseSaturday : string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hourCloseSunday : string;

  @ManyToOne(() => City, (city) => city.pointOfInterest)
  public city: City;

  @OneToMany(() => Comment, (comment) => comment.pointOfInterest)
  public comments!: Comment[];

  @OneToMany(() => Rate, (rate) => rate.pointOfInterest)
  public rates!: Rate[];
}
