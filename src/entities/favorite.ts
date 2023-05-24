import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { PointOfInterest } from './pointOfInterest';
  import { User } from './user';
import { Field, ObjectType } from 'type-graphql';
  
  @ObjectType()
  @Entity()
  export class Favorite {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({name: "userId"})
    public user: User;
  
    @Field(() => PointOfInterest)
    @JoinColumn({name: "poiId"})
    @ManyToOne(() => PointOfInterest, (poi) => poi.favorites, { onDelete: 'CASCADE' })
    public pointOfInterest: PointOfInterest;
  }
  