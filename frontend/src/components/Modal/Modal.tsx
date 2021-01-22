import { createContext, useContext } from "react";
import ReactDOM from "react-dom";
import getClassFunction from "../../functions/getClasses";
import useModal, { ModalTypes } from "./functions/useModal";
import styles from "./Modal.module.scss";

const getClass = getClassFunction(styles);

const Modal = () => {
	const { modal, modalContent, handleModal } = useContext<ModalTypes>(
		ModalContext
	);
	console.log(modal, modalContent);
	if (!modal) return null;

	return ReactDOM.createPortal(
		<div className={getClass("modal")}>
			<h1>Modal</h1>
			<p>{modalContent}</p>
			<button onClick={handleModal}>Close</button>
		</div>,
		document.getElementById("modal")
	);
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

export default Modal;
