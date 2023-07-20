import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { PointOfInterest } from "./pointOfInterest";
import { Point } from "geojson";
import { User } from "./user";

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

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.city)
  users: User[];
}
