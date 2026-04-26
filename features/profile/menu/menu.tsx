import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { RoutesForAuth } from '@/shared/routes/routes';
import { useAuthStore } from '@/shared/store';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FamilyMembers } from './family-members/family-members';

export const Menu = () => {
	const { logout } = useAuthStore();
	const [isCheckFamilyMembers, setInCheckFamilyMembers] = useState(false)
	const handleLogout = async () => {
		try {
			await logout();
			router.replace(RoutesForAuth.SIGN_IN);
		} catch (error) {
			console.error('Ошибка выхода:', error);
		}
	};

	const handleCheckFamilyMembers = () => {

	}

	return (
		<VerLayout styles={styleMenu.menu}>
			<FamilyMembers />
			<Button
				text='Выйти'
				onPress={handleLogout}
				addonRight={<Ionicons name='exit' size={24}/>}
			/>
		</VerLayout>
	);
};

const styleMenu = StyleSheet.create({
	menu: {
		width: '100%',
		alignItems: 'center',
		gap: 10
	},
});
