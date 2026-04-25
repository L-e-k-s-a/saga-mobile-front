import { ModalWindow } from "@/shared/ui/modal/modal-window"
import { CreatePetForm } from "../create-pet-form/create-pet-form"


type CreateInterestModalProps = {
    isVisible: boolean, 
    setIsVisible: (isVisible: boolean) => void
}

export const CreatePetModal = ({isVisible, setIsVisible}: CreateInterestModalProps) => {
    return (
        <ModalWindow 
            visible={isVisible}
            onClose={() => setIsVisible(false)}
            content={() => <CreatePetForm />}
        />
    )
}