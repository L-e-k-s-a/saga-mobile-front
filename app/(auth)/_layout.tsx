import { stackHeaderSettingsOptions } from '@/shared/lib/settings-screen/stack-header-settings-options';
import { Stack } from 'expo-router';

export default function AuthLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='index'
				options={stackHeaderSettingsOptions('', false)}
			/>
			<Stack.Screen
				name='register'
				options={stackHeaderSettingsOptions('Регистрация')}
			/>
			<Stack.Screen
				name='signIn'
				options={stackHeaderSettingsOptions('Вход')}
			/>
		</Stack>
	);
}
