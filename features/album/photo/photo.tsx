import { COLORS } from '@/shared/constants/colors';
import { useImagePicker } from '@/shared/hooks/use-picker-image';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

type PhotoProps = {
	photo: string;
};

export const Photo = ({ photo }: PhotoProps) => {
	const { image, pickImage, isLoading } = useImagePicker();
	return (
		<TouchableOpacity
			style={stylePhoto.add}
			disabled={isLoading}
			onPress={() => pickImage([1, 1])}>
			{image ? (
				<Image style={stylePhoto.image} source={{ uri: image }} />
			) : (
				<Ionicons
					name='add-circle'
					size={48}
					color={COLORS.white}
				/>
			)}
		</TouchableOpacity>
	);
};

const stylePhoto = StyleSheet.create({
	add: {
		backgroundColor: COLORS.secondary,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 10
	}
});
