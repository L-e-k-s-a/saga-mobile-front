import { stackHeaderSettingsOptions } from '@/shared/lib/settings-screen/stack-header-settings-options';
import { Stack } from 'expo-router';

export default function ClubByInterestLayout() {
	return (
				<Stack screenOptions={{headerShown: false}}>
					<Stack.Screen
						name="index"
						options={stackHeaderSettingsOptions("Клуб по интересам")}
					/>
				</Stack>
	);
}
