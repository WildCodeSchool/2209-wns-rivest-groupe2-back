import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./user";

@ObjectType()
@Entity()
export class Role {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(({ nullable: true }))
  @Column(({ nullable: true }))
  name: string;

  @Field(({ nullable: true }))
  @Column(({ nullable: true }))
  description: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}