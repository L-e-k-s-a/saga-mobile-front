import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleShadow } from '@/shared/styles/shadows';
import type { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

type CardVariant = 'primary' | 'secondary'

type CardProps = {
	children: ReactNode;
	variant?: CardVariant
	style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, variant = 'primary',style }: CardProps) => {
	return (
		<VerLayout styles={[styleCard[variant], styleShadow.primary, style]}>
			{children}
		</VerLayout>
	);
};

const styleCard = StyleSheet.create({
	primary: {
		backgroundColor: COLORS.white,
	},
	secondary: {
		backgroundColor: COLORS.secondary
	}
});
