import { useState } from 'react';
import { DropDownFamily } from '../ui/drop-downs/drop-down-family/drop-down-family';

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
