import { Field, ObjectType } from "type-graphql";
import { nanoid } from "nanoid";
import { Bunk } from "./Bunk";
import { Entity, Column, ManyToOne, BaseEntity, PrimaryColumn } from "typeorm";

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
}