import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleModal } from '@/shared/styles/modal';
import { ReactNode } from 'react';
import { Modal } from 'react-native';
import { Card } from '../card/card';

type ModalWindowProps = {
	visible: boolean;
	content: () => ReactNode;
};

export const ModalWindow = ({ visible, content }: ModalWindowProps) => {
	return (
		<Modal
			visible={visible}
			transparent={true}
            animationType='fade'
            >
			<VerLayout styles={styleModal.modalOverlay}>
				<Card style={styleModal.modalContent}>{content()}</Card>
			</VerLayout>
		</Modal>
	);
};
