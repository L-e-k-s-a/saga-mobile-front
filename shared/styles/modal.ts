import { StyleSheet } from 'react-native';
import { PADDINGS } from '../constants/paddings';
import { COLORS } from '../constants/colors';
import { BORDER_RADII } from '../constants/borderRadii';

export const styleModal = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		padding: PADDINGS.px32,
	},
	modalContent: {
		backgroundColor: COLORS.white,
		borderRadius: BORDER_RADII.primary,
		paddingHorizontal: PADDINGS.px16,
		paddingTop: PADDINGS.px16,
		paddingBottom: PADDINGS.px32,
		maxHeight: '90%',
	},
});
