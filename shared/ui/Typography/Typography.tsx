import { COLORS } from '@/shared/constants/colors';
import { Variants } from '@/shared/types/typography';
import { ReactNode } from 'react';
import {StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

export type TypographyProps = {
	children: ReactNode;
	variant?: Variants;
	style?: StyleProp<TextStyle>
};

export const Typography = ({ variant = 'div', children, style }: TypographyProps) => {
	function getTag(variant: string) {
		switch (variant) {
			case 'h1':
				return styles.h1;
			case 'h2':
				return styles.h2;
			case 'h3':
				return styles.h3;
			case 'div':
				return styles.div;
			default:
				return styles.div;
		}
	}

	return <Text style={[getTag(variant), style]}>{children}</Text>;
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
});
