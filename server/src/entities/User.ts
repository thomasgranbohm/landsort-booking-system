import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { nanoid } from "nanoid";

@ObjectType()
@Entity()
export class User {
	@Field()
	@PrimaryKey()
	uuid: string = nanoid(12);

	@Field()
	@Property()
	firstname!: string;

	@Field()
	@Property()
	lastname!: string;

	@Field()
	@Property({ name: "fullName", persist: false })
	getFullName() {
		return `${this.firstname} ${this.lastname}`
	}

	// TODO Add email verification
	@Field()
	@Property()
	email!: string;

	@Field()
	@Property()
	phonenumber: number;
}