import { useState } from 'react';
import { FamilyModalActions } from '@/widget/FamilyModalActions/FamilyModalActions';

export const useActionWithFamily = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModalVisible = () => {
        setIsModalVisible(!isModalVisible);
    };

    return {
        isModalVisible,
        setIsModalVisible,
        handleModalVisible,
    };
};
