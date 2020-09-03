import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { DatabaseContext, BunkResponse } from "../types";
import { Bunk } from "../entities/Bunk";
import { Room } from "../entities/Room";

@Resolver()
export class BunkResolver {

	@Query(() => [Bunk], { nullable: true })
	async bunks(
		@Ctx() { em }: DatabaseContext
	): Promise<Bunk[] | null> {
		return em.find(Bunk, {});
	}

	@Query(() => [Bunk], { nullable: true })
	async bunksInRoom(
		@Arg('roomID') roomID: number,
		@Ctx() { em }: DatabaseContext
	): Promise<Bunk[] | null> {
		return em.find(Bunk, { room: roomID });
	}

	@Query(() => BunkResponse)
	async bunk(
		@Arg('id') id: number,
		@Ctx() { em }: DatabaseContext
	): Promise<BunkResponse> {
		const bunk = await em.findOne(Bunk, { id });
		if (!bunk)
			return {
				errors: [
					{
						argument: "id",
						message: "No bunk with that id exists"
					}
				]
			}
		return { bunk };
	}

	@Mutation(() => BunkResponse)
	async createBunk(
		@Arg('location') location: string,
		@Arg('roomID') room: number,
		@Ctx() { em }: DatabaseContext
	): Promise<BunkResponse> {
		const foundBunk = await em.findOne(Bunk, { location, room });
		if (foundBunk) {
			return {
				errors: [{
					argument: "location",
					message: "That bunk already exists in that room"
				}]
			}
		}
		const foundRoom = await em.findOne(Room, { id: room });
		if (!foundRoom)
			return {
				errors: [{
					argument: "roomID",
					message: "Room doesn't exist"
				}]
			}
		const bunk = em.create(Bunk, { location, room });
		await em.persistAndFlush(bunk);
		return { bunk };
	}

	@Mutation(() => BunkResponse)
	async updateBunk(
		@Arg('bunkID') id: number,
		@Arg('newLocation', { nullable: true }) newLocation: string,
		@Arg('newRoom', { nullable: true }) roomID: number,
		@Ctx() { em }: DatabaseContext
	): Promise<BunkResponse> {
		const bunk = await em.findOne(Bunk, { id });
		if (!bunk)
			return {
				errors: [
					{
						argument: "id",
						message: "No bunk with that id exists"
					}
				]
			}
		if (typeof location !== "undefined") {
			bunk.location = newLocation;
			await em.persistAndFlush(bunk);
		}
		if (typeof roomID !== "undefined") {
			const room = await em.findOne(Room, { id: roomID });
			if (room) {
				bunk.room = room;
			}
			await em.persistAndFlush(bunk);
		}
		return { bunk };
	}

	@Mutation(() => Boolean)
	async deleteBunk(
		@Arg('id') id: number,
		@Ctx() { em }: DatabaseContext
	): Promise<Boolean> {
		try {
			await em.nativeDelete(Bunk, { id });
		} catch (err) {
			return false;
		}
		return true;
	}

}