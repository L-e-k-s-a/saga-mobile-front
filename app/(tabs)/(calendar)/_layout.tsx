import { stackScreenSettingsOptions } from '@/shared/lib/settings-screen/stack-screen-settings-options';
import { stackSettingsOptions } from '@/shared/lib/settings-screen/stack-settings-options';
import { Stack } from 'expo-router';

export default function CalendarLayout() {
	return (
		<Stack screenOptions={stackSettingsOptions()}>
			<Stack.Screen
				name='index'
				options={stackScreenSettingsOptions('Календарь')}
			/>
		</Stack>
	);
}
