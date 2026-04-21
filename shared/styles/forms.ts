import { COLORS } from '@/shared/constants/colors';
import { StyleSheet } from 'react-native';

const btnCommon = {
	color: COLORS.primaryColorText,
	padding: 10,
	borderRadius: 10,
	borderStyle: 'solid',
	borderWidth: 1,
	borderColor: COLORS.black,
} as const;

export const styleForm = StyleSheet.create({
	form: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	section: {
		width: '100%',
		marginBottom: 20,
	},
	input: {
		borderWidth: 0.5,
		backgroundColor: COLORS.primaryColorBackgroundInput,
		borderRadius: 10,
		height: 52,
		width: '100%',
		paddingHorizontal: 16,
		fontSize: 16,
		marginTop: 8,
	},
	submitSection: {
		width: '100%',
		alignItems: 'center',
		marginTop: 16,
	},
	btns: {
		gap: 12,
		width: '100%',
		marginTop: 16,
	},
	btnSecondary: {
		...btnCommon,
		backgroundColor: COLORS.secondary,
		width: '100%',
	},
	btnPrimary: {
		...btnCommon,
		backgroundColor: COLORS.primary,
		width: '100%',
	},
	label: {
		color: COLORS.primaryColorText,
		fontSize: 14,
		fontWeight: '500',
	},
	actionLabel: {
		color: COLORS.primaryColorText,
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 8,
	},
	buttonText: {
		color: COLORS.primaryColorText,
		fontSize: 16,
		fontWeight: '600',
	},
	errorPrimary: {
		color: COLORS.white
	}
});
