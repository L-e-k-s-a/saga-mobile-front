import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleShadow } from '@/shared/styles/shadows';
import type { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

type CardProps = {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, style }: CardProps) => {
	return (
		<VerLayout styles={[styleCard.card, styleShadow.primary, style]}>
			{children}
		</VerLayout>
	);
};

const styleCard = StyleSheet.create({
	card: {
		backgroundColor: COLORS.white,
	},
});
