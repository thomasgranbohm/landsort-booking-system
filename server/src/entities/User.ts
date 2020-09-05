import { Field, ObjectType } from "type-graphql";
import { nanoid } from "nanoid";
import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn } from "typeorm";
import { Booking } from "./Booking";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryColumn()
	uuid: string = nanoid(12);

	@Field()
	@Column()
	firstname!: string;

	@Field()
	@Column()
	lastname!: string;

	// TODO Add email verification
	@Field()
	@Column()
	email!: string;

	@Field(() => String, { nullable: true })
	@Column()
	phonenumber?: string;

	@Field(() => [Booking], { nullable: true })
	@OneToMany(() => Booking, booking => booking.bunk)
	bookings: Booking[];
}