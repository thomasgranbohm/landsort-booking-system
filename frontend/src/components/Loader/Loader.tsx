import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type Props = {
	isLoading: boolean;
};

const Loader: React.FC<Props> = ({ isLoading, children }) => {
	return <div>{isLoading ? <LoadingSpinner /> : children}</div>;
};

export default Loader;
