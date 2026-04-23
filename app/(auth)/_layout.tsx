import { stackScreenSettingsOptions } from '@/shared/lib/settings-screen/stack-screen-settings-options';
import { Stack } from 'expo-router';

export default function AuthLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='index'
				options={stackScreenSettingsOptions('', false)}
			/>
			<Stack.Screen
				name='register'
				options={stackScreenSettingsOptions('Регистрация')}
			/>
			<Stack.Screen
				name='signIn'
				options={stackScreenSettingsOptions('Вход')}
			/>
		</Stack>
	);
}
