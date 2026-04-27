import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { RoutesForAuth } from '@/shared/routes/routes';
import { useAuthStore } from '@/shared/store';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Menu } from '@/shared/ui/menu/menu';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FamilyMembers } from './family-members/family-members';

export const MenuProfile = () => {
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
		<Menu
			content={
				<>
					<FamilyMembers />
					<Button
						text='Выйти'
						onPress={handleLogout}
						addonRight={
							<Ionicons
								name='exit'
								size={24}
							/>
						}
					/>
				</>
			}
		/>
	);
};
