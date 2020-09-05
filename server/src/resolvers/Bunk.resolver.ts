import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { BunkResponse } from "../types";
import { Bunk } from "../entities/Bunk";
import { getConnection, getRepository } from "typeorm";
import { Room } from "../entities/Room";

@Resolver()
export class BunkResolver {

	@Query(() => [Bunk], { nullable: true })
	async bunks(): Promise<Bunk[] | null> {
		return getRepository(Bunk)
			.createQueryBuilder("bunk")
			.innerJoinAndSelect("bunk.room", "room")
			.getMany();
	}

	@Query(() => [Bunk], { nullable: true })
	async bunksInRoom(
		@Arg('roomId') roomId: number
	): Promise<Bunk[] | null> {
		return Bunk.find({ where: { roomId } });
	}

	@Query(() => BunkResponse)
	async bunk(
		@Arg('id') id: number
	): Promise<BunkResponse> {
		const bunk = await getConnection()
			.createQueryBuilder()
			.from(Bunk, "bunk")
			.innerJoinAndSelect("bunk.room", "room", "room.id = bunk.roomId")
			.where("bunk.id = :id", { id })
			.getOne()

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
		@Arg('roomId') roomId: number
	): Promise<BunkResponse> {
		const room = await Room.findOne(roomId);
		if (!room)
			return {
				errors: [{ argument: "roomId", message: "That room doesn't exist" }]
			};

		const foundBunk = await Bunk.findOne({ where: { location, room } });
		if (foundBunk) {
			return {
				errors: [{
					argument: "location",
					message: "That bunk already exists in that room"
				}]
			}
		}
		try {
			const bunk = await Bunk.create({ location, room }).save();
			return { bunk };
		} catch (err) {
			if (err.code === '23503' || err.detail.includes('is not present in table'))
				return {
					errors: [{ argument: "roomId", message: "That room doesn't exist" }]
				}
			else {
				console.error(err)
				return { errors: [] }
			}
		}
	}

	@Mutation(() => BunkResponse)
	async updateBunk(
		@Arg('bunkID') id: number,
		@Arg('newLocation', { nullable: true }) newLocation: string,
		@Arg('newRoom', { nullable: true }) roomId: number
	): Promise<BunkResponse> {
		const bunk = await Bunk.findOne(id);
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
			await Bunk.update({ id }, { location: newLocation });
		}
		if (typeof roomId !== "undefined") {
			const room = await Room.findOne(id);
			if (room) {
				try {
					await Bunk.update({ id }, { room })
				} catch (err) {
					// TODO Kolla erroret
					console.error(err);
				}
			}
		}
		return { bunk };
	}

	@Mutation(() => Boolean)
	async deleteBunk(
		@Arg('id') id: number
	): Promise<Boolean> {
		try {
			await Bunk.delete(id);
		} catch (err) {
			return false;
		}
		return true;
	}

}