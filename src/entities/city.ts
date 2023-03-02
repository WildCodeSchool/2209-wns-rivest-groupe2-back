import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Country } from "./country";
import { PointOfInterest } from "./pointOfInterest";

@ObjectType()
@Entity()
export class City {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Index({ spatial: true })
  @Column({
    type: "geometry",
    srid: 4326,
    nullable: true,
    spatialFeatureType: "Point",
  })
  currentLocation?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  population?: number;

  @ManyToOne(() => Country, (country) => country.cities)
  public country: Country;

  @OneToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.city)
  public pointOfInterest: PointOfInterest[];
}
