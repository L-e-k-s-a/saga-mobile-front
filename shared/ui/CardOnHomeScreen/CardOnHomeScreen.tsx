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
				<HorLayout>
					<Typography variant='h3'>{title}</Typography>
					<Image
						style={styles.image}
						source={image}
					/>
				</HorLayout>
			</Card>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '48%',
		height: '17%',
		justifyContent: 'center',
		backgroundColor: COLORS.ligthGray,
		color: COLORS.white,
		borderRadius: BORDER_RADII.px10,
	},
	image: {
		width: 40,
		height: 40,
	},
});
