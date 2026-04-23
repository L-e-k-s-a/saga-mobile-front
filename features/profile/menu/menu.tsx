import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { RoutesForAuth } from '@/shared/routes/routes';
import { useAuthStore } from '@/shared/store';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

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
		<VerLayout>
			<HorLayout>
				<Ionicons />
				<Button
					text='Выйти'
					onPress={handleLogout}
				/>
			</HorLayout>
		</VerLayout>
	);
};
