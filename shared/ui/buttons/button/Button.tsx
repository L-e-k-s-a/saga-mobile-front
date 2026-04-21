import { COLORS } from '@/shared/constants/colors';
import { VariantTypography } from '@/shared/types/variant-typography';
import {
	StyleProp,
	StyleSheet,
	TextStyle,
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
	textVariant?: VariantTypography;
	textStyle?: StyleProp<TextStyle>;
	onPress: () => void;
};

export const Button = ({
	text,
	onPress,
	style,
	textVariant,
	textStyle,
	variant = 'primary',
	size = 'm',
}: ButtonProps) => {
	const getVariantButton = (variant: VariantsBtn) => {
		return buttonStyle[variant];
	};

	const getSize = (size: Size) => {
		return buttonStyle[size];
	};

	const getStyleText = () => {
		if (variant === 'primary') {
			return buttonStyle['textPrimary'];
		} else if (variant === 'secondary') {
			return buttonStyle['textSecondary'];
		}
	};

	return (
		<TouchableOpacity
			style={[getVariantButton(variant), getSize(size), style]}
			onPress={onPress}>
			<Typography
				variant={textVariant}
				style={[getStyleText(), textStyle]}>
				{text}
			</Typography>
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
		backgroundColor: COLORS.primary,
		...common,
	},
	secondary: {
		backgroundColor: COLORS.secondary,
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
	textPrimary: {
		color: COLORS.black,
	},
	textSecondary: {
		color: COLORS.white,
	},
});
