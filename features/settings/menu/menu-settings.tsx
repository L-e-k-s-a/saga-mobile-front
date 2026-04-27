import { COLORS } from '@/shared/constants/colors';
import { RoutesForTabs } from '@/shared/routes/routes';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Menu } from '@/shared/ui/menu/menu';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export const MenuSettings = () => {

    const hanleSettingsFavorite = () => {
        router.navigate(RoutesForTabs.SETTINGS_FAVORITE)
    }

	return (
		<Menu
			content={
				<>
					<Button
						text='Настроить избранное'
						addonRight={<Ionicons name='chevron-forward' size={24} color={COLORS.white}/>}
						onPress={hanleSettingsFavorite}
                        fullWidth
						textVariant='h3'
					/>
				</>
			}
		/>
	);
};
