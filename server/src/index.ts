import "reflect-metadata";
import { __prod__, portNumber } from "./constants";
import TOConfig from "./typeorm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RoomResolver } from "./resolvers/Room.resolver";
import { BunkResolver } from "./resolvers/Bunk.resolver";
import { BookingResolver } from "./resolvers/Booking.resolver";
import { UserResolver } from "./resolvers/User.resolver";
import { createConnection } from "typeorm";

const main = async () => {
	await createConnection(TOConfig);

	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [RoomResolver, BunkResolver, BookingResolver, UserResolver],
			validate: false
		})
	})

	apolloServer.applyMiddleware({ app });

	app.listen(portNumber, () => console.log("Listening on ::", portNumber))

}

main().catch(err => console.error("ERRORRRRRR", err))