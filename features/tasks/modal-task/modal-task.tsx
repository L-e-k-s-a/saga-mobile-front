import { Task } from "@/shared/types/task"
import { CardTask } from "../card-task/card-task"
import { Modal } from "react-native"
import { Card } from "@/shared/ui/card/card"
import { styleModal } from "@/shared/styles/modal"
import { ButtonCross } from "@/shared/ui/buttons/button-cross/button-cross"
import { getImportanceTask } from "../libs/get-importance-task"
import { Button } from "@/shared/ui/buttons/button/Button"



type ModalTaskProps = {
    task: Task,
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void
}

export const ModalTask = ({task, isVisible, setIsVisible}: ModalTaskProps) => {
    const importanceTask = getImportanceTask(task)
    return(
        <Modal 
            visible={isVisible}
            transparent={true}
        >
           <Card style={styleModal.modalOverlay}>
                <ButtonCross close={setIsVisible}/>
                <Button text="Отменить выполнение" onPress={() => {}}/>
                <Button text="Выполнена" onPress={() => {}}/>
           </Card>
        </Modal>
    )

}