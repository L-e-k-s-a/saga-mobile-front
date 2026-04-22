import { ModalWindow } from '@/shared/ui/modal/modal-window';
import { CreateTaskForm } from '../create-task-form/create-task-form';

type CreateTaskProps = {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
};

export const CreateTaskModal = ({
	isVisible,
	setIsVisible,
}: CreateTaskProps) => {
	return (
		<ModalWindow
			visible={isVisible}
			content={() => <CreateTaskForm setIsVisible={setIsVisible} />}
		/>
	);
};
