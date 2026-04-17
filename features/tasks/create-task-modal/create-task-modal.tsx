import { Modal } from "react-native"


type CreateTaskProps = {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

export const CreateTaskModal = ({isVisible, setIsVisible}: CreateTaskProps) => {
    return(
        <Modal
            visible={isVisible}
            transparent={true}
        >
            
        </Modal>
    )
}