import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { ReactNode } from 'react';
import {
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import { Typography } from '../../typography/typography';

type VariantsBtn = 'primary' | 'secondary';

type Size = 's' | 'm' | 'l';

type ButtonProps = {
	text?: string;
	variant?: VariantsBtn;
	size?: Size;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
	fullWidth?: boolean;
	addonRight?: ReactNode;
	onPress: () => void;
};

export const Button = ({
	text,
	style,
	variant = 'primary',
	size = 'm',
	disabled,
	fullWidth,
	addonRight,
	onPress,
}: ButtonProps) => {
	const getStyleText = () => {
		if (variant === 'primary') {
			return buttonStyle['textPrimary'];
		} else if (variant === 'secondary') {
			return buttonStyle['textSecondary'];
		}
	};
	return (
		<TouchableOpacity
			disabled={disabled}
			style={[
				buttonStyle[variant],
				buttonStyle[size],
				fullWidth && buttonStyle.fw,
				disabled ? { opacity: 0.45 } : { opacity: 1 },
				style,
			]}
			onPress={onPress}>
			<HorLayout style={addonRight ? buttonStyle.withAddon : undefined}>
				<Typography style={[getStyleText()]}>{text}</Typography>
				{addonRight}
			</HorLayout>
		</TouchableOpacity>
	);
};

const common = {
	borderRadius: 10,
	borderWidth: 1,
	width: 150,
	alignItems: 'center',
	justifyContent: 'center',
} as const;

const buttonStyle = StyleSheet.create({
	primary: {
		...common,
		backgroundColor: COLORS.secondary,
	},
	secondary: {
		backgroundColor: COLORS.primary,
		...common,
	},
	s: {
		padding: 10,
		width: 95,
	},

	m: {
		padding: 16,
	},

	l: {
		padding: 24,
	},
	fw: {
		width: '100%',
	},
	textPrimary: {
		color: COLORS.white,
	},
	textSecondary: {
		color: COLORS.black,
	},
	withAddon: {
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
