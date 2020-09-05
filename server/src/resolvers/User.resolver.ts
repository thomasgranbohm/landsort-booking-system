import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User } from "../entities/User";
import { UserInput, UserResponse } from "../types";

@Resolver()
export class UserResolver {

	@Query(() => [User])
	async users(): Promise<User[]> {
		return User.find({});
	}

	@Mutation(() => UserResponse)
	async createUser(
		@Arg('input') input: UserInput
	): Promise<UserResponse> {
		const found = await User.findOne({ where: { email: input.email } });
		if (found)
			return {
				errors: [{
					argument: "email",
					message: "Email already exists."
				}]
			}

		const user = await User.create(input).save();
		return { user };
	}

}