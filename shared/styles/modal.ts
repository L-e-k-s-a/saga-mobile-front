import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const styleModal = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center' 
	},
	modalContent: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		maxHeight: '90%',

	},
	dragIndicatorContainer: {
		alignItems: 'center',
		paddingTop: 8,
		paddingBottom: 4,
	},
	dragIndicator: {
		width: 40,
		height: 4,
		borderRadius: 2,
		backgroundColor: '#ccc',
	},
});
