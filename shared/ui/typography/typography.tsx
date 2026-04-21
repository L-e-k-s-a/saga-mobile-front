import { COLORS } from '@/shared/constants/colors';
import { VariantTypography } from '@/shared/types/variant-typography';
import { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

export type TypographyProps = {
	children: ReactNode;
	variant?: VariantTypography;
	textColor?: 'primary' | 'secondary';
	fontSize?: '24' | '16' | '14';
	style?: StyleProp<TextStyle>;
};

export const Typography = ({
	children,
	variant = 'div',
	textColor = 'primary',
	fontSize = '16',
	style,
}: TypographyProps) => {

	return (
		<Text
			style={[
				styles[`font${fontSize}`],
				styles[variant],
				styles[textColor],
				...[style],
			]}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	h1: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	h2: {
		fontSize: 24,
		fontWeight: '600',
		marginBottom: 12,
	},
	h3: {
		fontSize: 18,
		fontWeight: '500',
		marginBottom: 8,
	},
	div: {
		fontSize: 14,
		marginBottom: 4,
	},

	primary: {
		color: COLORS.white,
	},
	secondary: {
		color: COLORS.black,
	},
	font24: {
		fontSize: 24,
	},
	font16: {
		fontSize: 16,
	},
	font14: {
		fontSize: 14,
	},
});
