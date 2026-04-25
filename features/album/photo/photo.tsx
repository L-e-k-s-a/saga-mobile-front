import { COLORS } from '@/shared/constants/colors';
import { Card } from '@/shared/ui/card/card';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';


type PhotoProps = {
    photo: string
}

export const Photo = ({photo}: PhotoProps) => {
	return (
		<TouchableOpacity>
			<Card style={stylePhoto.add}>
				<Ionicons
					name='add-circle'
					size={48}
					color={COLORS.white}
				/>
			</Card>
		</TouchableOpacity>
	);
};

const stylePhoto = StyleSheet.create({
	add: {
		backgroundColor: COLORS.secondary,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
