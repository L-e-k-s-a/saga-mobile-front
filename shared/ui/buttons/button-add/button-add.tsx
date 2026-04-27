import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../button/Button';
import { COLORS } from '@/shared/constants/colors';
import { Ionicons } from '@expo/vector-icons';

type ButtonAddProps = {
	action: () => void;
};

export const ButtonAdd = ({ action }: ButtonAddProps) => {
	return (
		<TouchableOpacity
                style={styleButtonAdd.buttonAdd}
				onPress={action}
                >
				<Ionicons
					name='add-circle'
					size={48}
					color={COLORS.white}
				/>
			</TouchableOpacity>
	);
};

const styleButtonAdd = StyleSheet.create({
    buttonAdd: {
        position: 'absolute',
        bottom: 90,
        right: 20
    }
});
