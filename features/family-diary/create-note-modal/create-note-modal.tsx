import { ModalWindow } from '@/shared/ui/modal/modal-window';
import { CreateNote } from '../create-note/create-note';

type CreateNoteModalProps = {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
};

export const CreateNoteModal = ({
	isVisible,
	setIsVisible,
}: CreateNoteModalProps) => {
	return (
		<ModalWindow
			visible={isVisible}
			content={() => <CreateNote setIsVisible={setIsVisible} />}
		/>
	);
};
