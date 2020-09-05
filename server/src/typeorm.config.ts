import { __prod__ } from "./constants";
import { ConnectionOptions } from "typeorm";

import { Room } from "./entities/Room";
import { Bunk } from "./entities/Bunk";
import { Booking } from "./entities/Booking";
import { User } from "./entities/User";

export default {
	type: 'postgres',
	database: 'landsort-booking',
	username: 'postgres',
	password: 'postgres',
	logging: true,
	synchronize: true,
	entities: [Bunk, Booking, Room, User]
} as ConnectionOptions;