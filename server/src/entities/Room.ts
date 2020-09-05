import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Bunk } from "./Bunk";

@ObjectType()
@Entity()
export class Room extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column()
	location: string;

	@Field(() => [Bunk], { defaultValue: [] })
	@OneToMany(() => Bunk, bunk => bunk.room)
	bunks: Bunk[];
}
