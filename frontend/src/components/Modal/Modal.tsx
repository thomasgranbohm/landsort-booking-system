import { createContext, createRef, useContext, useState } from "react";
import ReactDOM from "react-dom";
import getClassFunction from "../../functions/getClasses";
import joinClasses from "../../functions/joinClasses";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from "./Modal.module.scss";

const getClass = getClassFunction(styles);

type ModalState = {
	type?: "success" | "error";
	data?: any;
	title?: string;
	buttonText?: string;
	onClose?: () => void;
};

export type ModalTypes = {
	modal: boolean;
	modalContent: ModalState;
	handleModal: (state?: ModalState) => void;
};

export const ModalContext = createContext(undefined);
export const ModalProvider: React.FC = ({ children }) => {
	const { modal, modalContent, handleModal } = useModal();
	return (
		<ModalContext.Provider value={{ modal, modalContent, handleModal }}>
			<Modal />
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = (): ModalTypes => {
	const [modal, setModal] = useState<boolean>(false);
	const [modalContent, setModalContent] = useState<ModalState>({});

	const handleModal = (state?: ModalState) => {
		setModal(!modal);
		if (!state) return;
		setModalContent(state);
	};

	return { modal, modalContent, handleModal };
};

const Modal = () => {
	const { modal, modalContent, handleModal } = useContext<ModalTypes>(
		ModalContext
	);
	if (!modal) return null;
	const containerRef = createRef<HTMLDivElement>();

	const { buttonText, data, title, type, onClose } = modalContent;

	const isError = type === "error";
	const isSuccess = type === "success";

	const onClick = () => {
		handleModal();
		if (!!onClose) onClose();
	};

	return ReactDOM.createPortal(
		<div
			className={getClass("container")}
			onClick={(e) => e.target === containerRef.current && onClick()}
			ref={containerRef}
		>
			<div
				className={joinClasses(
					[getClass("modal"), true],
					[getClass("error"), isError],
					[getClass("success"), isSuccess]
				)}
			>
				<Heading type="h2">
					{isError ? "Ett fel uppstod." : title}
				</Heading>
				<p>{data}</p>
				<Button
					inline
					customType={
						(isError && "return") ||
						(isSuccess && "continue") ||
						"none"
					}
					onClick={onClick}
				>
					{buttonText || "Stäng"}
				</Button>
			</div>
		</div>,
		document.getElementById("modal")
	);
};

export default Modal;
