import { InputType, Field, ObjectType } from "type-graphql";
import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Room } from "./entities/Room";
import { Bunk } from "./entities/Bunk";
import { Booking } from "./entities/Booking";

export type DatabaseContext = {
	em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};

@InputType()
export class UserInput {
	@Field()
	name: string;

	@Field()
	email: string;
}

@ObjectType()
export class ArgumentError {
	@Field()
	argument: string;
	@Field()
	message: string;
}

@ObjectType()
export class RoomResponse {
	@Field(() => [ArgumentError], { nullable: true })
	errors?: ArgumentError[];

	@Field(() => Room, { nullable: true })
	room?: Room
}

@ObjectType()
export class BunkResponse {
	@Field(() => [ArgumentError], { nullable: true })
	errors?: ArgumentError[];

	@Field(() => Bunk, { nullable: true })
	bunk?: Bunk
}

@ObjectType()
export class BookingResponse {
	@Field(() => [ArgumentError], { nullable: true })
	errors?: ArgumentError[];

	@Field(() => Booking, { nullable: true })
	booking?: Booking
}