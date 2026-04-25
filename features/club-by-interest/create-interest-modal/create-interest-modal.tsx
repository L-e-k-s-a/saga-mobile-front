import { ModalWindow } from "@/shared/ui/modal/modal-window"
import { CreateInterestForm } from "../create-interest-form/create-interest-form"


type CreateInterestModalProps = {
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void
}

export const CreateInterestModal = ({isVisible, setIsVisible}: CreateInterestModalProps) => {
    return (
        <ModalWindow 
            visible={isVisible}
            onClose={() => setIsVisible(false)}
            content={() => <CreateInterestForm />}
        />
    )
}