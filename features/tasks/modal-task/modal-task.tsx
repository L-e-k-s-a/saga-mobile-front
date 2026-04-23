import { Task } from "@/shared/types/task"
import { CardTask } from "../card-task/card-task"
import { Modal } from "react-native"
import { Card } from "@/shared/ui/card/card"
import { styleModal } from "@/shared/styles/modal"
import { ButtonCross } from "@/shared/ui/buttons/button-cross/button-cross"
import { getImportanceTask } from "../libs/get-importance-task"
import { Button } from "@/shared/ui/buttons/button/Button"
import { VerLayout } from "@/shared/layouts/VerLayout/VerLayout"
import { Typography } from "@/shared/ui/typography/typography"



type ModalTaskProps = {
    task: Task,
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void
}

//добавить dropdowm с именами в семье чтобы можно было заполнять исполнителей
export const ModalTask = ({task, isVisible, setIsVisible}: ModalTaskProps) => {
    const importanceTask = getImportanceTask(task)
    return(
        <Modal 
            visible={isVisible}
            transparent={true}
        >
           <Card style={styleModal.modalOverlay}>
                <Typography textColor="secondary">{task.title}</Typography>
                <Typography textColor="secondary">{task.description}</Typography>
                <VerLayout styles={styleModal.modalContent}>
                    <ButtonCross close={setIsVisible}/>
                    <Button text="Выполнена" onPress={() => {}}/>
                </VerLayout>
           </Card>
        </Modal>
    )
}
