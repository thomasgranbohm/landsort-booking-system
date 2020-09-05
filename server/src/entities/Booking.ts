import { Field, ObjectType } from "type-graphql";
import { nanoid } from "nanoid";
import { Bunk } from "./Bunk";
import { Entity, Column, ManyToOne, BaseEntity, PrimaryColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Booking extends BaseEntity {
	@Field()
	@PrimaryColumn()
	uuid: string = nanoid(12);

	@Field(() => Date)
	@Column()
	startDate!: Date;

	@Field(() => Date)
	@Column()
	endDate!: Date;

	@Field(() => Bunk)
	@ManyToOne(() => Bunk)
	bunk: Bunk;

	@Field(() => User)
	@ManyToOne(() => User)
	user: User;

	@Field()
	@Column()
	cancellationId: string = nanoid(16);
}