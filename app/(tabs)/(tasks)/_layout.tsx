import { Stack } from 'expo-router';

export default function TasksLayout() {
	return (
		<Stack.Screen
			options={{
				title: 'Задачи',
			}}
		/>
	);
}
