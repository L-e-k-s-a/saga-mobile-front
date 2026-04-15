import { useState } from "react";
import { DropDowmFamily } from "../ui/drop-down-family/drop-down-family";

export const useCreateFamily = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const handleModalVisible = () => {
        setIsModalVisible(!isModalVisible)
    }

    return {
        handleModalVisible,
        Modal: () => (
            <DropDowmFamily 
                isVisible={isModalVisible} 
            />
        )
    };
};