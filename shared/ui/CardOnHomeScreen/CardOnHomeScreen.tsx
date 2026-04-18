import { router } from 'expo-router';
import {
	Image,
	ImageSourcePropType,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { BORDER_RADII } from '../../constants/borderRadii';
import { COLORS } from '../../constants/colors';
import { HorLayout } from '../../layouts/HorLayout/HorLayout';
import { TypeRoutesForTabs } from '../../routes/routes';
import { Card } from '../Card/Card';
import { Typography } from '../Typography/Typography';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';

type CardOnHomeScreeenProps = {
	title: string;
	image: ImageSourcePropType;
	route: TypeRoutesForTabs;
};

export const CardOnHomeScreeen = ({
	title,
	image,
	route,
}: CardOnHomeScreeenProps) => {
	const handleClickCard = () => {
		router.push(route);
	};

	return (
		<TouchableOpacity
			style={styles.card}
			onPress={handleClickCard}>
			<Card>
				<HorLayout style={styles.tile}>
					<Typography style={styles.containerTitle} variant='h3'>{title}</Typography>
					<VerLayout styles={styles.containerImage}>
						<Image
							style={styles.image}
							source={image}
						/>
					</VerLayout>
				</HorLayout>
			</Card>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	tile: {
		justifyContent: 'space-between',
		gap: 5,
		padding: 8
	},
	card: {
		width: '48%',
		height: '17%',
		justifyContent: 'center',
		backgroundColor: COLORS.ligthGray,
		color: COLORS.white,
		borderRadius: BORDER_RADII.px10,
	},
	containerTitle: {
		width: '71%',
		color: COLORS.white,
	},
	containerImage: {
		width: '29%'
	},
	image: {
		width: 45,
		height: 45,
	},
});
