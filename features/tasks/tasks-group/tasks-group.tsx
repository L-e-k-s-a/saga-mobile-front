import { useUserStore } from '@/shared/store/user/user-store';
import { Task } from '@/shared/types/task';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { CardTask } from '../card-task/card-task';
import { useGetTasks } from '../hooks/use-get-tasks';
import { ModalTask } from '../modal-task/modal-task';


export const TasksGroup = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task>({
		taskId: '',
		familyId: '',
		title: '',
		description: '',
		indicator: '',
		isCompleted: false,
		executors: [],
	});
	const { activeFamily } = useUserStore();

	const { tasks, isLoading, error } = useGetTasks(activeFamily);


	if (!activeFamily) {
		return (
			<NoData
				title='Похоже Вы не состоите в семье'
				desctiption='Быстрее создайте или вступите в семью!'
			/>
		);
	}

	if (error) {
		return;
	}

	if (isLoading) {
		return <Spinner />;
	}

	return tasks && tasks.length > 0 ? (
		<>
			<FlatList
				data={tasks}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => {
							setSelectedTask(item);
							setIsVisible(true);
						}}>
						<CardTask task={item} />
					</TouchableOpacity>
				)}
				ListFooterComponent={<View style={{ height: 150 }} />}
			/>
			{isVisible && (
				<ModalTask
					task={selectedTask}
					isVisible={isVisible}
					setIsVisible={setIsVisible}
				/>
			)}
		</>
	) : (
		<NoData
			title='Задач нет'
			desctiption='Создайте задачу!'
		/>
	);
};
