import { COLORS } from '@/shared/constants/colors';
import { StyleSheet, View } from 'react-native';

export const Slider = () => {
	return <View style={styles.slider}></View>;
};

const styles = StyleSheet.create({
	slider: {
		height: '25%',
		backgroundColor: COLORS.white,
		borderRadius: 10,
	},
});
