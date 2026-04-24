import { COLORS } from '@/shared/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Typography } from '../typography/typography';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';

type CheckboxProps = {
	label?: string;
};

export const Checkbox = ({ label }: CheckboxProps) => {
	const [checked, setChecked] = useState(false);

	return (
		<TouchableOpacity onPress={() => setChecked(!checked)}>
			<HorLayout style={styleCheckbox.box}>
				<MaterialIcons
					name={checked ? 'check-box' : 'check-box-outline-blank'}
					size={24}
					color={COLORS.primary}
				/>
				{label && <Typography textColor='secondary'>{label}</Typography>}
			</HorLayout>
		</TouchableOpacity>
	);
};


const styleCheckbox = StyleSheet.create({
    box: {
        height: 40,
        alignItems: 'center'
    }
})