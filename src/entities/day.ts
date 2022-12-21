import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { PointOfInterest } from "./pointOfInterest";
import { IDay } from "../interfaces/IDay"

@ObjectType()
@Entity()
export class Day implements IDay{
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column({ unique: true })
  hourOpen: string;

  @Field()
  @Column({ unique: true })
  hourClose: string;

  @ManyToOne(() => PointOfInterest, (pointOfInterest) => pointOfInterest.days)
  pointOfInterest: PointOfInterest[];
}