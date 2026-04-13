import { headerSettingsOptions } from '@/shared/lib/settings-screen/header-settings-options';
import { Stack } from 'expo-router';

export default function FamilyDiaryLayout() {
	return (
		<Stack screenOptions={{headerShown: false}}>
			<Stack.Screen
				name="index"
				options={headerSettingsOptions("Дневник")}
			/>
		</Stack>
	);
}
