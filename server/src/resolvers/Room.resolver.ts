import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { DatabaseContext, RoomResponse } from "../types";
import { Room } from "../entities/Room";

@Resolver()
export class RoomResolver {

	@Query(() => [Room])
	rooms(@Ctx() { em }: DatabaseContext): Promise<Room[]> {
		return em.find(Room, {});
	}

	@Query(() => RoomResponse)
	async room(
		@Arg('id') id: number,
		@Ctx() { em }: DatabaseContext
	): Promise<RoomResponse> {
		const room = await em.findOne(Room, { id });
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
		@Arg('location') location: string,
		@Ctx() { em }: DatabaseContext
	): Promise<Room> {
		const room = em.create(Room, { location });
		await em.persistAndFlush(room);
		return room;
	}

	@Mutation(() => RoomResponse)
	async updateRoom(
		@Arg('id') id: number,
		@Arg('newLocation') newLocation: string,
		@Ctx() { em }: DatabaseContext
	): Promise<RoomResponse> {
		const room = await em.findOne(Room, { id });
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
			room.location = newLocation;
			await em.persistAndFlush(room);
		}
		return { room };
	}

	@Mutation(() => Boolean)
	async deleteRoom(
		@Arg('id') id: number,
		@Ctx() { em }: DatabaseContext
	): Promise<Boolean> {
		try {
			await em.nativeDelete(Room, { id });
		} catch (err) {
			return false;
		}
		return true;
	}

}