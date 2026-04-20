import { COLORS } from '@/shared/constants/colors';
import { IMPORTANCE } from '@/shared/constants/importance';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { Task } from '@/shared/types/task';
import { Card } from '@/shared/ui/card/card';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet, View } from 'react-native';

type CardTaskProps = {
	task: Task;
	isVisible: boolean;
	setVisible: (isVisible: boolean) => void;
};

export const CardTask = ({ task, isVisible, setVisible }: CardTaskProps) => {
	const importanceTask = (() => {
		if (task.indicator === 'low') return IMPORTANCE.low;
		if (task.indicator === 'middle') return IMPORTANCE.middle;
		if (task.indicator === 'hard') return IMPORTANCE.hard;
		return { importance: '', color: '', text: '' };
	})();

	return (
		<Card style={styleCardTask.task}>
			<Typography
				variant='h2'
				style={styleCardTask.textColor}>
				{task.title}
			</Typography>
			<HorLayout style={styleCardTask.containerIndicator}>
				<Typography variant='h3' style={[styleCardTask.textColor, styleCardTask.textIndicator]}>
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

const styleCardTask = StyleSheet.create({
	task: {
		alignItems: 'center',
        gap: 10
	},
    containerIndicator: {
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
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
        width: "65%"
    },
	textColor: {
		color: COLORS.black,
	},
});
