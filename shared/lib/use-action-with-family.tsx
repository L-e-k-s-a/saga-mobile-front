import { useState } from 'react';
import { DropDownFamily } from '../ui/drop-down-family/drop-down-family';
import { CreateFamilyForm } from '@/features/forms/create-family-form/create-family-form';

export const useActionWithFamily = (handleCreateFamily: (isVisible: boolean) => void) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleModalVisible = () => {
		setIsModalVisible(!isModalVisible);
	};

	return {
		handleModalVisible,
		Modal: () => (
			<DropDownFamily
				isVisible={isModalVisible}
				handleCreateFamily={handleCreateFamily}
			/>
		),
	};
};
