import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleModal } from '@/shared/styles/modal';
import { Task } from '@/shared/types/task';
import { ButtonCross } from '@/shared/ui/buttons/button-cross/button-cross';
import { Button } from '@/shared/ui/buttons/button/Button';
import { ModalWindow } from '@/shared/ui/modal/modal-window';
import { Toggle } from '@/shared/ui/toggle/toggle';
import { Typography } from '@/shared/ui/typography/typography';
import { getImportanceTask } from '../libs/get-importance-task';
import { Card } from '@/shared/ui/card/card';

type ModalTaskProps = {
	task: Task;
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
};

//добавить dropdowm с именами в семье чтобы можно было заполнять исполнителей
export const ModalTask = ({
	task,
	isVisible,
	setIsVisible,
}: ModalTaskProps) => {
	const importanceTask = getImportanceTask(task);
	return (
		<ModalWindow
            visible={isVisible}
			content={() => <Card style={styleModal.modalOverlay}>
                <Typography textColor="secondary">{task.title}</Typography>
                <Typography textColor="secondary">{task.description}</Typography>
                <VerLayout styles={styleModal.modalContent}>
                    <ButtonCross close={setIsVisible}/>
                    <Button text="Выполнена" onPress={() => {}}/>
                </VerLayout>
           </Card>}
       /> 
    )
}
