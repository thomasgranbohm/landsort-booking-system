import { useState } from "react";

export type ModalTypes = {
	modal: boolean;
	modalContent: any;
	handleModal: (content: any) => void;
};

export default (): ModalTypes => {
	const [modal, setModal] = useState<boolean>(false);
	const [modalContent, setModalContent] = useState<any>("wower");

	const handleModal = (content = false) => {
		setModal(!modal);
		if (!!content) {
			setModalContent(content);
		}
	};

	return { modal, modalContent, handleModal };
};
