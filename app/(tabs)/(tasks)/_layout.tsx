import { headerSettingsOptions } from '@/shared/lib/settings-screen/header-settings-options';
import { HeaderBackButton } from '@react-navigation/elements';
import { Stack } from 'expo-router';

export default function TasksLayout() {
	return (
		<Stack screenOptions={{headerShown: false}}>
			<Stack.Screen
				name="index"
				options={
					headerSettingsOptions('Задачи')
				}
			/>
		</Stack>
	);
}
