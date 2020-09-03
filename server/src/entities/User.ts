import { Field, ObjectType } from "type-graphql";
import { nanoid } from "nanoid";
import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@ObjectType()
@Entity()
export class User {
	@Field()
	@PrimaryGeneratedColumn()
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

	@Field()
	@Column()
	phonenumber: number;
}