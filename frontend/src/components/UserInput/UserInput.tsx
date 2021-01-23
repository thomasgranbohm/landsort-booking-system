import getClassFunction from "../../functions/getClasses";
import Input from "../Input/Input";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import { UserInputRefs } from "../../types";

type Props = UserInputRefs;

const UserInput = ({ firstname, lastname }: Props) => {
	return (
		<>
			<InputWithLabel label="Förnamn" forInput="firstname">
				<Input type="text" name="firstname" placeholder="Sven" ref={firstname} />
			</InputWithLabel>
			<InputWithLabel label="Efternamn" forInput="lastname">
				<Input type="text" name="lastname" placeholder="Svensson" ref={lastname} />
			</InputWithLabel>
		</>
	);
};

export default UserInput;
