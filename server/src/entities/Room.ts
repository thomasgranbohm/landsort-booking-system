import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Room {
	@Field()
	@PrimaryKey()
	id!: number;

	@Field(() => String)
	@Property()
	location: string;

}
