import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Room } from "./Room";
import { Booking } from "./Booking";

@ObjectType()
@Entity()
export class Bunk {
	@Field()
	@PrimaryKey()
	id!: number;

	@Field()
	@Property()
	location: string

	// @Field()
	// @Property()
	// available: Boolean = true;

	@Field(() => Room)
	@ManyToOne(() => Room)
	room: Room;

	@Field(() => [Booking])
	@OneToMany(() => Booking, booking => booking.bunk)
	bookings = new Collection<Booking>(this);

}