import { MutableRefObject } from "react";

export type AnyProps = {
	[key: string]: any;
};

export type ClassNameProp = {
	className?: string;
};

export type HeadingTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b";

export type UserInputRefs = {
	firstname: MutableRefObject<HTMLInputElement>;
	lastname: MutableRefObject<HTMLInputElement>;
};

export type Dates = {
	arrival: string;
	departure: string;
};

export declare module APITypes {
	export interface Room {
		id: number;
		location: string;
		bunks?: Bunk[];
	}

	export interface Bunk {
		id: number;
		location: string;
		room?: Room;
		bookings?: Booking[];
	}
	export interface User {
		firstname: string;
		lastname: string;
		email: string;
		phonenumber: string;
	}

	export interface Booking {
		id: string;
		start_date: string;
		end_date: string;
		confirmed: number;
		bunks: Bunk[];
		user: User;
	}
}
