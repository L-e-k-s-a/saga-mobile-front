import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { Task } from '@/shared/types/task';
import { Button } from '@/shared/ui/buttons/button/Button';
import { ModalWindow } from '@/shared/ui/modal/modal-window';
import { Toggle } from '@/shared/ui/toggle/toggle';
import { Typography } from '@/shared/ui/typography/typography';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getImportanceTask } from '../libs/get-importance-task';
import { updateOneDoc } from '@/shared/lib/updateOneDoc';
import { useSetTaskCompleted } from '../hooks/use-task-completed';

type ModalTaskProps = {
	task: Task;
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
};

export const ModalTask = ({
	task,
	isVisible,
	setIsVisible,
}: ModalTaskProps) => {
	const { setTaskCompleted } = useSetTaskCompleted()
	const [isCompleted, setIsCompleted] = useState(task.isCompleted);
	const importanceTask = getImportanceTask(task);

	const handleCompleted = () => {
		setTaskCompleted(task)
		setIsVisible(false)
	}

	return (
		<ModalWindow
			visible={isVisible}
			onClose={() => setIsVisible(false)}
			content={() => (
				<VerLayout styles={styleModalTask.container}>
					<View style={styleModalTask.header}>
						<Typography
							variant='h3'
							textColor='secondary'
							style={styleModalTask.sectionTitle}>
							Название задачи
						</Typography>

						<Typography
							textColor='secondary'
							style={styleModalTask.titleText}>
							{task.title}
						</Typography>
					</View>

					<View style={styleModalTask.descriptionSection}>
						<Typography
							variant='h3'
							textColor='secondary'
							style={styleModalTask.sectionTitle}>
							Доп. информация
						</Typography>
						<Typography
							textColor='secondary'
							style={styleModalTask.descriptionText}>
							{task.description !== '' ? task.description : 'Нет доп. информации'}
						</Typography>
					</View>

					<HorLayout style={styleModalTask.importanceContainer}>
						<View
							style={[
								styleModalTask.indicator,
								{ backgroundColor: importanceTask.color },
							]}
						/>
						<Typography textColor='secondary'>{importanceTask.text}</Typography>
					</HorLayout>

					<HorLayout style={styleModalTask.section}>
						<Typography
							variant='h3'
							textColor='secondary'>
							Выполнено
						</Typography>

						<Toggle
							isEnabled={isCompleted}
							onValueChange={() => setIsCompleted(!isCompleted)}
						/>
					</HorLayout>

					<Button
						text={'Выполнена'}
						onPress={handleCompleted}
						disabled={!isCompleted}
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
		justifyContent: 'center',
		gap: 20,
		paddingVertical: 20,
	},
	header: {
		width: '90%',
		alignItems: 'center',
		gap: 8,
	},
	sectionTitle: {
		width: '100%',
		textAlign: 'center',
	},
	titleText: {
		fontSize: 16,
		textAlign: 'center',
		fontWeight: '500',
	},
	descriptionSection: {
		width: '90%',
		gap: 8,
	},
	descriptionText: {
		fontSize: 14,
		lineHeight: 20,
		width: '100%',
		textAlign: 'center',
	},
	section: {
		justifyContent: 'space-between',
		width: '90%',
		paddingHorizontal: 12,
	},
	indicator: {
		height: 20,
		width: 20,
		borderRadius: 10,
		marginRight: 12,
	},
	importanceContainer: {
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		paddingHorizontal: 12,
		height: 32,
		borderRadius: 20,
	},
});
