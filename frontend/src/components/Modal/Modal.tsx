import { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";
import getClassFunction from "../../functions/getClasses";
import joinClasses from "../../functions/joinClasses";
import styles from "./Modal.module.scss";

const getClass = getClassFunction(styles);

type ModalState = {
	error: boolean;
	data?: any;
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
	const [modalContent, setModalContent] = useState<ModalState>({
		error: false,
	});

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

	return ReactDOM.createPortal(
		<div className={getClass("container")} onClick={() => handleModal()}>
			<div
				className={joinClasses(
					[getClass("modal"), true],
					[getClass("error"), modalContent.error]
				)}
			>
				<h1>Ett fel uppstod!</h1>
				<p>{modalContent.data}</p>
				<button onClick={() => handleModal()}>Stäng</button>
			</div>
		</div>,
		document.getElementById("modal")
	);
};

export default Modal;
