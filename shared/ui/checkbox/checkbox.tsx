import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../typography/typography';

type CheckboxProps = {
	label?: string;
	checked?: boolean; 
	onPress: () => void;
	disabled?: boolean;
};

export const Checkbox = ({
	label,
	checked = false,
	onPress,
	disabled = false,
}: CheckboxProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			style={[styleCheckbox.container, disabled && styleCheckbox.disabled]}>
			<HorLayout style={styleCheckbox.box}>
				<MaterialIcons
					name={checked ? 'check-box' : 'check-box-outline-blank'}
					size={24}
					color={disabled ? COLORS.primary : COLORS.primary}
				/>
				{label && (
					<Typography
						textColor='secondary'
						style={disabled && styleCheckbox.disabledText}>
						{label}
					</Typography>
				)}
			</HorLayout>
		</TouchableOpacity>
	);
};

const styleCheckbox = StyleSheet.create({
	container: {

	},
	box: {
		height: 40,
		alignItems: 'center',
		paddingVertical: 8,
	},
	disabled: {
		opacity: 0.6,
	},
	disabledText: {
		textDecorationLine: 'line-through',
	},
});
