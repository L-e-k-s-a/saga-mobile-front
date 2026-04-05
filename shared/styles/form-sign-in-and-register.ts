import { BORDER_RADII } from '@/shared/constants/borderRadii';
import { COLORS } from '@/shared/constants/colors';
import { GAPS } from '@/shared/constants/gaps';
import { PADDINGS } from '@/shared/constants/paddings';
import { StyleSheet } from 'react-native';


const btnCommon = {
	color: COLORS.primaryColorText,
	padding: PADDINGS.primaryButton,
	borderRadius: BORDER_RADII.primary,
	borderStyle: 'solid',
	borderWidth: 1,
	borderColor: COLORS.black,
} as const;


export const styleForm = StyleSheet.create({
	form: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: PADDINGS.px32,
	},
	section: {
		width: '100%',
		marginBottom: GAPS.px20,
	},
	input: {
		backgroundColor: COLORS.primaryColorBackgroundInput,
		borderRadius: BORDER_RADII.primary,
		height: 52,
		width: '100%',
		paddingHorizontal: PADDINGS.px16,
		fontSize: 16,
		marginTop: GAPS.px8,
	},
	submitSection: {
		width: '100%',
		alignItems: 'center',
		marginTop: GAPS.px16,
	},
	btns: {
		gap: GAPS.px12,
		width: '100%',
		marginTop: GAPS.px16,
	},
	btnSignIn: {
		...btnCommon,
		backgroundColor: COLORS.secondary,
		width: '100%',
	},
	btnRegister: {
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
		marginBottom: GAPS.px8,
	},
	buttonText: {
		color: COLORS.primaryColorText,
		fontSize: 16,
		fontWeight: '600',
	},
});
