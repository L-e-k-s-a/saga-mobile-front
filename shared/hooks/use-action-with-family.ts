import { useState } from 'react';

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
