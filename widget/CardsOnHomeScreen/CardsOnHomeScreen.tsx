import { CARDS_HOME_SCREEN } from '@/shared/constants/cardsOnHomeScreen';
import { GAPS } from '@/shared/constants/gaps';
import { CardOnHomeScreeen } from '@/shared/ui/card-on-home-screen/card-on-home-screen';
import { StyleSheet, View } from 'react-native';

export const CardsOnHomeScreen = () => {
	return (
		<View style={styles.cardContainer}>
			{CARDS_HOME_SCREEN.map((card) => (
				<CardOnHomeScreeen
					key={card.title}
					title={card.title}
					image={card.image}
					route={card.route}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		height: '65%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: 'center',
		gap: GAPS.px10,
	},
});
