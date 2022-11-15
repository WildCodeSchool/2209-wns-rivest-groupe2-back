import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./user";
import { PointOfInterest } from "./pointOfInterest";
// import { Comment } from "./comment";
// import { Rate } from "./rate";
// import { Image } from "./image";

@ObjectType()
@Entity()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public userId!: number;

  @Column()
  public pointOfInterestId!: number;

  @Field()
  @Column({ type: "timestamp", nullable: true })
  creationDate: Date;

  @Field()
  @Column({ type: "timestamp", nullable: true })
  updateDate: Date;

  @Field()
  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments)
  public user!: User;

  @ManyToOne(
    () => PointOfInterest,
    (pointOfInterest) => pointOfInterest.comments
  )
  public pointOfInterest!: PointOfInterest;
}
