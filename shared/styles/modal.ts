import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const styleModal = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		padding: 32,
	},
	modalContent: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 32,
		maxHeight: '90%',
	},
});
