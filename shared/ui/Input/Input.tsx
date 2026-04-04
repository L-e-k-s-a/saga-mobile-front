import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native"

type InputProps = {
    style?: StyleProp<ViewStyle>
    value: string,
    placeholder: string,
    onChangeText?: (value: string) => void;
    isPassword?: boolean
}

export const Input = ({style, placeholder, value, onChangeText, isPassword}: InputProps) => {
    return (
        <TextInput onChangeText={onChangeText} value={value} placeholder={placeholder} secureTextEntry={isPassword} style={[styleInput.input, style]} />
    )
} 

const styleInput = StyleSheet.create({
    input: {

    }
})