import { ModalWindow } from "@/shared/ui/modal/modal-window"
import { CreateFormCalendar } from "../create-form-calendar/create-form-calendar"


type CreateModalCalendarProps = {
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void
}


export const CreateModalCalendar = ({isVisible, setIsVisible}: CreateModalCalendarProps) => {
    return (
        <ModalWindow 
            visible={isVisible}
            onClose={() => setIsVisible(false)}
            content={() => (<CreateFormCalendar />)}
        />
    )
}