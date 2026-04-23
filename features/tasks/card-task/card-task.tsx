import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { Task } from '@/shared/types/task';
import { Card } from '@/shared/ui/card/card';
import { Line } from '@/shared/ui/line/line';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet, View } from 'react-native';
import { getImportanceTask } from '../libs/get-importance-task';

type CardTaskProps = {
	task: Task;
};

export const CardTask = ({ task }: CardTaskProps) => {
	const importanceTask = getImportanceTask(task);

	return (
		<Card style={styleCardTask.task}>
			{task.isCompleted ? (
				<Line style={styleCardTask.completed} />
			) : (
				<Line style={styleCardTask.noCompleted} />
			)}
			<Typography
				variant='h2'
				textColor='secondary'>
				{task.title}
			</Typography>
			<HorLayout style={styleCardTask.containerIndicator}>
				<Typography
					variant='h3'
					textColor='secondary'
					style={styleCardTask.textIndicator}>
					{importanceTask.text}
				</Typography>
				<View
					style={[
						styleCardTask.indicator,
						{ backgroundColor: importanceTask.color },
					]}
				/>
			</HorLayout>
		</Card>
	);
};

const lineCommon = {
	width: '100%',
	height: 3,
	borderRadius: 15,
} as const;

const styleCardTask = StyleSheet.create({
	task: {
		alignItems: 'center',
		gap: 10,
	},
	containerIndicator: {
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
	},
	indicator: {
		width: 30,
		height: 30,
		borderRadius: '50%',
	},
	text: {
		width: '100%',
		textAlign: 'center',
	},
	textIndicator: {
		width: '65%',
	},
	icon: {
		fontSize: 28,
	},
	completed: {
		backgroundColor: COLORS.green,
		...lineCommon,
	},
	noCompleted: {
		backgroundColor: COLORS.red,
		...lineCommon,
	},
});
