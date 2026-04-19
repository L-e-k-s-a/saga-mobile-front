import { Modal } from 'react-native';
import { CreateTaskForm } from '../create-task-form/create-task-form';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleModal } from '@/shared/styles/modal';

type CreateTaskProps = {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
};

export const CreateTaskModal = ({
	isVisible,
	setIsVisible,
}: CreateTaskProps) => {
	return (
		<Modal
			visible={isVisible}
			transparent={true}>
			<VerLayout styles={styleModal.modalOverlay}>
				<VerLayout styles={styleModal.modalContent}>
					<CreateTaskForm
						setIsVisible={setIsVisible}
					/>
				</VerLayout>
			</VerLayout>
		</Modal>
	);
};
