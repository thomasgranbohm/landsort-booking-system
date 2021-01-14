type Pair = [string, any];

const joinClasses = (...classNames: Pair[]) =>
	classNames
		.filter(([_, value]) => !!value)
		.map(([key, _]) => key)
		.join(" ");

export default joinClasses;
