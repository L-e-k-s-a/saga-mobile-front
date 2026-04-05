import { COLORS } from '@/shared/constants/colors';
import { headerSettingsOptions } from '@/shared/lib/auth/header-settings-options';
import { Stack } from 'expo-router';



export default function AuthLayout() {
	return (
        <Stack screenOptions={{ headerShown:  false}}>
            <Stack.Screen 
                name='index'
                options={headerSettingsOptions("", false)}
            />
            <Stack.Screen 
                    name='register'
                    options={headerSettingsOptions("Регистрация")}
                />
            <Stack.Screen 
                name='signIn'
                options={headerSettingsOptions("Вход")}
            />
        </Stack>
	);
}
