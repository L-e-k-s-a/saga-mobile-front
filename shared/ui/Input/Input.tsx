import { COLORS } from '@/shared/constants/colors';
import { StyleProp, StyleSheet, TextInput, ViewStyle } from 'react-native';

type InputProps = {
	style?: StyleProp<ViewStyle>;
	value: string;
	placeholder?: string;
	isPassword?: boolean;
	multiline?: boolean
	onChangeText?: (value: string) => void;
};

export const Input = ({
	style,
	placeholder,
	value,
	onChangeText,
	multiline,
	isPassword,
}: InputProps) => {
	return (
		<TextInput
			onChangeText={onChangeText}
			value={value}
			placeholder={placeholder}
            placeholderTextColor={COLORS.black} 
			secureTextEntry={isPassword}
			multiline={multiline}
			style={[styleInput.input, style]}
		/>
	);
};

const styleInput = StyleSheet.create({
	input: {},
});
