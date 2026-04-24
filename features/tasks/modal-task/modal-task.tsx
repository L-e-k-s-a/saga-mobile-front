import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { Task } from '@/shared/types/task';
import { ButtonCross } from '@/shared/ui/buttons/button-cross/button-cross';
import { Button } from '@/shared/ui/buttons/button/Button';
import { ModalWindow } from '@/shared/ui/modal/modal-window';
import { Toggle } from '@/shared/ui/toggle/toggle';
import { Typography } from '@/shared/ui/typography/typography';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getImportanceTask } from '../libs/get-importance-task';

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
	const [disabled, setDisabled] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const importanceTask = getImportanceTask(task);

	useEffect(() => {
		setDisabled(!disabled);
	}, [isCompleted]);

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
						<View style={styleModalTask.titleCard}>
							<Typography 
								textColor='secondary'
								style={styleModalTask.titleText}>
								{task.title}
							</Typography>
						</View>
					</View>

					<View style={styleModalTask.descriptionSection}>
						<Typography
							variant='h3'
							textColor='secondary'
							style={styleModalTask.sectionTitle}>
							Дополнительное описание
						</Typography>
						<View style={styleModalTask.descriptionCard}>
							<Typography 
								textColor='secondary'
								style={styleModalTask.descriptionText}>
								{task.description}
							</Typography>
						</View>
					</View>

					<HorLayout style={styleModalTask.section}>
						<Typography
							variant='h3'
							textColor='secondary'>
							Важность
						</Typography>
						<View style={styleModalTask.importanceContainer}>
							<View
								style={[
									styleModalTask.indicator,
									{ backgroundColor: importanceTask.color },
								]}
							/>
							<Typography 
								textColor='secondary'
								style={styleModalTask.importanceText}>
								{importanceTask.text}
							</Typography>
						</View>
					</HorLayout>

					<HorLayout style={styleModalTask.section}>
						<Typography
							variant='h3'
							textColor='secondary'>
							Задача выполнена
						</Typography>
						<View style={styleModalTask.toggleContainer}>
							<Toggle 
								isEnabled={isCompleted} 
								setIsEnabled={setIsCompleted}
							/>
							<Typography 
								textColor='secondary'
								style={styleModalTask.toggleStatusText}>
								{isCompleted ? 'Да' : 'Нет'}
							</Typography>
						</View>
					</HorLayout>

					<View style={styleModalTask.buttonContainer}>
						<Button
							text={isCompleted ? "✅ Выполнена" : "📋 Отметить как выполненную"}
							onPress={() => {}}
							disabled={disabled}
							fullWidth
						/>
					</View>
				</VerLayout>
			)}
		/>
	);
};

const styleModalTask = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 20,
		paddingVertical: 20,
	},
	header: {
		width: '90%',
		alignItems: 'center',
		gap: 8,
	},
	sectionTitle: {
		fontWeight: '600',
		letterSpacing: 0.5,
	},
	titleCard: {
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderRadius: 12,
		padding: 12,
		width: '100%',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
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
	descriptionCard: {
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderRadius: 12,
		padding: 12,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		minHeight: 80,
	},
	descriptionText: {
		fontSize: 14,
		lineHeight: 20,
	},
	section: {
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '90%',
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: 'rgba(255, 255, 255, 0.03)',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
	},
	indicator: {
		borderRadius: 10,
		height: 20,
		width: 20,
		marginRight: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 3,
	},
	importanceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
	},
	importanceText: {
		fontSize: 14,
		fontWeight: '500',
		marginLeft: 4,
	},
	toggleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	toggleStatusText: {
		fontSize: 14,
		fontWeight: '500',
		minWidth: 35,
		textAlign: 'center',
	},
	buttonContainer: {
		width: '90%',
		marginTop: 10,
		marginBottom: 5,
	},
});