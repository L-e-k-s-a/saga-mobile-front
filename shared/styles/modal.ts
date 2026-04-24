import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const styleModal = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		maxHeight: '90%',
		width: '80%'
	},
	dragIndicatorContainer: {
		width: '100%',
		alignItems: 'center',
		paddingBottom: 8,
		paddingTop: 4,
	},
	dragIndicator: {
		width: 40,
		height: 4,
		borderRadius: 2,
		backgroundColor: COLORS.secondary,
	},
});
