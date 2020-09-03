import { __prod__ } from "./constants";
import path from "path";

import { MikroORM } from "@mikro-orm/core";
import { Room } from "./entities/Room";
import { Bunk } from "./entities/Bunk";
import { Booking } from "./entities/Booking";

export default {
	dbName: "landsort-booking",
	type: "postgresql",
	password: "postgres",
	debug: !__prod__,
	entities: [Room, Bunk, Booking],
	migrations: {
		path: path.join(__dirname, "./migrations"),
		pattern: /^[\w-]+\d+\.[tj]s$/,
	},
} as Parameters<typeof MikroORM.init>[0];