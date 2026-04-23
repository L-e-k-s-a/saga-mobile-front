import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { Task } from '@/shared/types/task';
import { ButtonCross } from '@/shared/ui/buttons/button-cross/button-cross';
import { Button } from '@/shared/ui/buttons/button/Button';
import { ModalWindow } from '@/shared/ui/modal/modal-window';
import { Toggle } from '@/shared/ui/toggle/toggle';
import { Typography } from '@/shared/ui/typography/typography';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getImportanceTask } from '../libs/get-importance-task';

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
	const [disabled, setDisabled] = useState(true);
	const importanceTask = getImportanceTask(task);
	return (
		<ModalWindow
			visible={isVisible}
			content={() => (
				<VerLayout styles={styleModalTask.container}>
					<ButtonCross close={setIsVisible} />
					<Typography
						variant='h3'
						textColor='secondary'>
						Название задачи
					</Typography>
					<Typography textColor='secondary'>{task.title}</Typography>
					<Typography
						variant='h3'
						textColor='secondary'>
						Дополнительное описание
					</Typography>
					<Typography textColor='secondary'>{task.description}</Typography>
					<HorLayout style={styleModalTask.section}>
						<Typography
							variant='h3'
							textColor='secondary'>
							Важность
						</Typography>
						<View
							style={[
								styleModalTask.indicator,
								{ backgroundColor: importanceTask.color },
							]}
						/>
					</HorLayout>
					<HorLayout style={styleModalTask.section}>
						<Typography
							variant='h3'
							textColor='secondary'>
							Задача выполнена
						</Typography>
						<Toggle />
					</HorLayout>
					<Button
						text='Выполнена'
						onPress={() => {}}
						fullWidth
					/>
				</VerLayout>
			)}
		/>
	);
};

const styleModalTask = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	section: {
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
	},
	indicator: {
		borderRadius: '50%',
		height: 20,
		width: 20
	},
});
