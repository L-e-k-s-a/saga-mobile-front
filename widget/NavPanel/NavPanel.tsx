import { BORDER_RADII } from '@/shared/constants/borderRadii';
import { COLORS } from '@/shared/constants/colors';
import { StyleSheet, View } from 'react-native';

export const NavPanel = () => {
	return <View style={styles.navPanel}></View>;
};

const styles = StyleSheet.create({
	navPanel: {
		margin: 'auto',
		height: '8%',
		width: '60%',
		backgroundColor: COLORS.ligthGray,
		borderRadius: BORDER_RADII.px10,
	},
});
