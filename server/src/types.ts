import { IsEmail, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Booking } from "./entities/Booking";
import { Bunk } from "./entities/Bunk";
import { Room } from "./entities/Room";
import { User } from "./entities/User";

export type DatabaseContext = {};

@InputType()
export class UserInput {
	@Field()
	@Length(2)
	firstname!: string

	@Field()
	@Length(2)
	lastname!: string

	@Field()
	@IsEmail()
	email!: string

	@Field({ nullable: true })
	@Length(10, 12)
	phonenumber?: string
}

@InputType()
export class BookingInput {
	@Field()
	startDateString!: string;

	@Field()
	endDateString!: string;

	@Field()
	bunkId!: number;

	@Field()
	@Length(12)
	userId!: string;
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

@ObjectType()
export class UserResponse {
	@Field(() => [ArgumentError], { nullable: true })
	errors?: ArgumentError[];

	@Field(() => User, { nullable: true })
	user?: User
}

export class CustomDate extends Date {
	constructor(input: Date | string | number) {
		if (input instanceof Date) {
			super(input.getFullYear(), input.getMonth(), input.getDate(), 12, 0, 0, 0);
		}
		else {
			super(input)
			this.setHours(12, 0, 0, 0);
		};

		this.toString = () => this.toDateString();
		console.log("Logging date:", this.toString())
	}
	getTomorrow(): CustomDate {
		return new CustomDate(new Date().setDate(this.getDate() + 1));
	}
	getYesterday(): CustomDate {
		return new CustomDate(new Date().setDate(this.getDate() - 1));
	}
}