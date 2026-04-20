import { useUserStore } from '@/shared/store/user/user-store';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useGetTasks } from '../hooks/use-get-tasks';
import { CardTask } from '../card-task/card-task';
import { useEffect, useState } from 'react';


type TasksGroupProps = {
	refetchTrigger: boolean
}

export const TasksGroup = ({refetchTrigger}: TasksGroupProps) => {
	const [isVisible, setIsVisible] = useState(false)
	const { activeFamily } = useUserStore();
	if (!activeFamily) {
		return (
			<NoData
				title='Похоже Вы не состоите в семье'
				desctiption='Быстрее создайте или вступите в семью!'
			/>
		);
	}
	const { data: tasks, isLoading, error, refetch } = useGetTasks(activeFamily);

	useEffect(() => {
		refetch()
	}, [refetchTrigger])

	if (isLoading) {
		return <Spinner />;
	}

	return tasks.length > 0 ? (
		<FlatList 
			data={tasks}
			renderItem={({item}) => 
			<TouchableOpacity onPress={() => setIsVisible(true)}>
				<CardTask isVisible={isVisible} setVisible={setIsVisible} task={item}/>
			</TouchableOpacity>}
			
			ListFooterComponent={<View style={{height: 150}} />}
		/>
	) : (
		<NoData
			title='Задач нет'
			desctiption='Создайте задачу!'
		/>
	);
}

