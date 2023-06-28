import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { PointOfInterest } from "./pointOfInterest";

@ObjectType()
@Entity()
export class OpeningHours {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  dayOpen: string;

  @Field(() => [String])
  @Column({ array: true })
  hoursOpen: string;

  @Field(() => [String])
  @Column({ array: true })
  hoursClose: string;

  @ManyToOne(
    () => PointOfInterest,
    (pointOfInterest) => pointOfInterest.openingHours,
    { onDelete: "CASCADE" }
  )
  pointOfInterest: PointOfInterest;
}
