import { COLORS } from "@/shared/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native"

export const ProfileImage = () => {
	return (
		<TouchableOpacity style={stileProfileImage.image}>
                <Ionicons name="add" size={48} color={COLORS.white}/>
		</TouchableOpacity>
	);
};


const stileProfileImage = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        backgroundColor: COLORS.secondary,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})