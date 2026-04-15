import { stackHeaderSettingsOptions } from '@/shared/lib/settings-screen/stack-header-settings-options';
import { Stack } from 'expo-router';

export default function FamilyDiaryLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='index'
				options={stackHeaderSettingsOptions('Дневник')}
			/>
		</Stack>
	);
}
