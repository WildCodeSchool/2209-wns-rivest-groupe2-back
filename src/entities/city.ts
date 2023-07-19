import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { PointOfInterest } from "./pointOfInterest";
import { Point } from "geojson";

@ObjectType()
@Entity()
export class City {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Number], { nullable: true })
  @Column("float", { array: true, nullable: true })
  coordinates: Point;

  @OneToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.city)
  public pointOfInterest: PointOfInterest[];
}
