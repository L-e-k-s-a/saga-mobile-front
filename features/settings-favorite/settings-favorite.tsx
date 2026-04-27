import { CARDS_HOME_SCREEN } from '@/shared/constants/cardsOnHomeScreen';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { useSettingsStore } from '@/shared/store/settings/settings-store';
import { TypeCardHomeScreen } from '@/shared/types/type-card-home-screen';
import { Toggle } from '@/shared/ui/toggle/toggle';
import { Typography } from '@/shared/ui/typography/typography';
import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';

export const SettingsFavorite = () => {
	const { setFavorite } = useSettingsStore();
	const [isEnabled, setIsEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleSelect = (item: TypeCardHomeScreen, index: number) => {
		if (selectedIndex === index) return;

		setSelectedIndex(index);
		setFavorite(item.route);
	};
	return (
		<VerLayout styles={styleSettingsFavorite.container}>
			{CARDS_HOME_SCREEN.map((item, index) => (
				<HorLayout
					key={item.route}
					style={styleSettingsFavorite.item}>
					<HorLayout style={styleSettingsFavorite.left}>
						<Image
							source={item.image}
							style={styleSettingsFavorite.image}
						/>
						<Typography variant='h3'>{item.title}</Typography>
					</HorLayout>
					<Toggle
						isEnabled={selectedIndex === index}
						onValueChange={() => handleSelect(item, index)}
					/>
				</HorLayout>
			))}
		</VerLayout>
	);
};

const styleSettingsFavorite = StyleSheet.create({
	container: {
		gap: 10,
	},
	item: {
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	left: {
		alignItems: 'center',
		gap: 10,
	},
	image: {
		width: 35,
		height: 35,
	},
});
