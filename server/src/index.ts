import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__, portNumber } from "./constants";
import MOConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RoomResolver } from "./resolvers/Room.resolver";
import { BunkResolver } from "./resolvers/Bunk.resolver";
import { BookingResolver } from "./resolvers/Booking.resolver";

const main = async () => {
	const orm = await MikroORM.init(MOConfig);
	orm.getMigrator().up();

	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [RoomResolver, BunkResolver, BookingResolver],
			validate: false
		}),
		context: () => ({ em: orm.em })
	})

	apolloServer.applyMiddleware({ app });

	app.listen(portNumber, () => console.log("Listening on ::", portNumber))

}

main().catch(err => console.error("ERRORRRRRR", err))