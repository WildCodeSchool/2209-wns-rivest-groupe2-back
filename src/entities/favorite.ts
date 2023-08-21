import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { PointOfInterest } from "./pointOfInterest";
import { User } from "./user";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Favorite {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  poiId: number;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn()
  user: User;

  @Field(() => PointOfInterest)
  @JoinColumn({ name: "poiId" })
  @ManyToOne(() => PointOfInterest, (poi) => poi.favorites, {
    onDelete: "CASCADE",
  })
  public pointOfInterest: PointOfInterest;
}
