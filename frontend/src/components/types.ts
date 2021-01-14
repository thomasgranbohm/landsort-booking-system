export type AnyProps = {
	[key: string]: any;
};

export type ClassNameProp = {
	className?: string;
};

export declare module APITypes {
	export interface Room {
		id: number;
		location: string;
		created_at: Date;
		updated_at: Date;
		bunks?: Bunk[];
	}
	export interface Bunk {
		id: number;
		location: string;
		room_id: number;
		created_at: Date;
		updated_at: Date;
		room?: Room;
		bookings?: Booking[];
	}
	export interface User {
		id: string;
		firstname: string;
		lastname: string;
		email: string;
		phonenumber: string;
		created_at: Date;
		updated_at: Date;
	}
	export interface Booking {
		id: string;
		start_date: string;
		end_date: string;
		bunk_id: number;
		user_id: string;
		created_at: Date;
		updated_at: Date;
		bunk: Bunk;
		user: User;
	}
}
