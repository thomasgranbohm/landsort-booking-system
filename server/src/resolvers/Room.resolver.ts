import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { RoomResponse } from "../types";
import { Room } from "../entities/Room";
import { getRepository } from "typeorm";

@Resolver()
export class RoomResolver {

	@Query(() => [Room])
	rooms(): Promise<Room[]> {
		return getRepository(Room)
			.createQueryBuilder("room")
			.leftJoinAndSelect("room.bunks", "bunk")
			.getMany();
	}

	@Query(() => RoomResponse)
	async room(
		@Arg('id') id: number
	): Promise<RoomResponse> {
		const room = await Room.findOne(id);
		if (!room)
			return {
				errors: [
					{
						argument: "id",
						message: "No room with that id exists"
					}
				]
			}
		return { room };
	}

	@Mutation(() => Room)
	async createRoom(
		@Arg('location') location: string
	): Promise<Room> {
		const room = await Room.create({ location }).save();
		console.log(await Room.findOne(room.id))
		return room;
	}

	@Mutation(() => RoomResponse)
	async updateRoom(
		@Arg('id') id: number,
		@Arg('newLocation') newLocation: string
	): Promise<RoomResponse> {
		const room = await Room.findOne(id);
		if (!room)
			return {
				errors: [
					{
						argument: "id",
						message: "No room with that id exists"
					}
				]
			}
		if (typeof location !== "undefined") {
			Room.update({ id }, { location: newLocation })
		}
		return { room };
	}

	@Mutation(() => Boolean)
	async deleteRoom(
		@Arg('id') id: number
	): Promise<Boolean> {
		try {
			await Room.delete(id);
		} catch (err) {
			return false;
		}
		return true;
	}

}