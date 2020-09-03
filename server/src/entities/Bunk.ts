import { Field, ObjectType } from "type-graphql";
import { Room } from "./Room";
import { Booking } from "./Booking";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Bunk extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	location: string

	@Field()
	@Column()
	roomId: number;

	@Field(() => Room)
	@ManyToOne(() => Room, room => room.bunks)
	room: Room;

	@Field(() => [Booking])
	@OneToMany(() => Booking, booking => booking.bunk)
	bookings: Booking[];

}