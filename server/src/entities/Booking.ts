import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { nanoid } from "nanoid";
import { Bunk } from "./Bunk";

@ObjectType()
@Entity()
export class Booking {
	@Field()
	@PrimaryKey()
	uuid: string = nanoid(12);

	@Field(() => Date)
	@Property()
	startDate!: Date;

	@Field(() => Date)
	@Property()
	endDate!: Date;

	@Field(() => Bunk)
	@ManyToOne(() => Bunk)
	bunk: Bunk;
}