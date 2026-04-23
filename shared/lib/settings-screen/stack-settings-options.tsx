import { COLORS } from '@/shared/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const stackSettingsOptions = () => {
	return {
		headerShown: false,
		headerLeft: () => (
			<TouchableOpacity style={styleHeaderLeft.left} onPress={() => router.back()}>
				<Ionicons name='chevron-back' size={24} color={COLORS.white}/>
			</TouchableOpacity>
		),
	};
};


const styleHeaderLeft = StyleSheet.create({
	left: {
		marginLeft: 15 
	}
})