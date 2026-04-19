import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { useUserStore } from '@/shared/store/user/user-store';
import { Task } from '@/shared/types/task';
import { Typography } from '@/shared/ui/Typography/Typography';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Spinner } from '@/shared/ui/spiner/spiner';
import { StyleSheet } from 'react-native';
import { useGetTasks } from '../hooks/use-get-tasks';

export const TasksGroup = () => {
	const { activeFamily } = useUserStore();
	if (!activeFamily) {
		return (
			<NoData
				title='Похоже Вы не состоите в семье'
				desctiption='Быстрее создайте или вступите в семью!'
			/>
		);
	}
	const { tasks, loading, error } = useGetTasks(activeFamily);

	if (loading) {
		return <Spinner />;
	}

	return tasks.length > 0 ? (
		<VerLayout>
			{tasks.map((task: Task) => (
				<Typography>{task.title}</Typography>
			))}
		</VerLayout>
	) : (
		<NoData
			title='Задач нет'
			desctiption='Создайте задачу!'
		/>
	);
};

const styleTasksGroup = StyleSheet.create({
	tasks: {
		flex: 1,
	},
});
