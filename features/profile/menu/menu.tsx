import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { RoutesForAuth } from '@/shared/routes/routes';
import { useAuthStore } from '@/shared/store';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

export const Menu = () => {
	const { logout } = useAuthStore();

	const handleLogout = async () => {
		try {
			await logout();
			router.replace(RoutesForAuth.SIGN_IN);
		} catch (error) {
			console.error('Ошибка выхода:', error);
		}
	};

	return (
		<VerLayout styles={styleMenu.menu}>
			<HorLayout>
				<Button
					text='Выйти'
					onPress={handleLogout}
				/>
			</HorLayout>
		</VerLayout>
	);
};


const styleMenu = StyleSheet.create({
    menu: {
        width: "100%",
		alignItems: 'center'
	}
})