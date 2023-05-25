import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
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

    @OneToOne(() => User, (user) => user.favorite)
    @JoinColumn()
    user: User;
  
    @Field(() => PointOfInterest)
    @JoinColumn({name: "poiId"})
    @ManyToOne(() => PointOfInterest, (poi) => poi.favorites, { onDelete: 'CASCADE' })
    public pointOfInterest: PointOfInterest;
  }
  