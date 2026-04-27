import { COLORS } from '@/shared/constants/colors';
import { useImagePicker } from '@/shared/hooks/use-picker-image';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export const ProfileImage = () => {
	const {image, pickImage, isLoading} = useImagePicker()

	return (
		<TouchableOpacity
			style={styleProfileImage.image}
			onPress={() => pickImage([1,1])}
            disabled={isLoading}
            >
			{image ? (
				<Image style={styleProfileImage.image} source={{ uri: image }} />
			) : (
				<Ionicons
					name='add'
					size={48}
					color={COLORS.white}
				/>
			)}
		</TouchableOpacity>
	);
};

const styleProfileImage = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
		backgroundColor: COLORS.secondary,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
