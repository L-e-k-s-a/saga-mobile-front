import { useState } from 'react';
import { FamilyActions } from '../../features/family-actions/family-actions';
import { FamilyModalActions } from '@/widget/FamilyModalActions/FamilyModalActions';

export const useActionWithFamily = (
	handleCreateFamily: (isVisible: boolean) => void,
) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleModalVisible = () => {
		setIsModalVisible(!isModalVisible);
	};

	return {
		handleModalVisible,
		Modal: () => (
			<FamilyModalActions
				isVisibleModal={isModalVisible}
				setIsVisibleModal={setIsModalVisible}
				handleCreateFamily={handleCreateFamily}
			/>
		),
	};
};
