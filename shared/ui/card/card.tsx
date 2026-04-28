import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleShadow } from '@/shared/styles/shadows';
import type { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Typography } from '../typography/typography';

type CardVariant = 'primary' | 'secondary';

type CardProps = {
	title?: string;
	titleColor?: 'primary' | 'secondary';
	children: ReactNode;
	variant?: CardVariant;
	style?: StyleProp<ViewStyle>;
};

export const Card = ({
	title,
	titleColor = 'primary',
	children,
	variant = 'primary',
	style,
}: CardProps) => {
	return (
		<VerLayout styles={[styleCard[variant], styleShadow.primary, style]}>
			{title && (
				<Typography
					variant='h3'
					textColor={titleColor}
					style={styleCard.title}>
					{title}
				</Typography>
			)}
			{children}
		</VerLayout>
	);
};

const styleCard = StyleSheet.create({
	primary: {
		backgroundColor: COLORS.white,
	},
	secondary: {
		backgroundColor: COLORS.secondary,
	},
	title: {
		width: '100%',
		textAlign: 'center',
	},
});
