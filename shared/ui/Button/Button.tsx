import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Typography } from "../Typography/Typography"
import { Variants } from "@/shared/types/typography"

type ButtonProps = {
    text: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>
    textVariant?: Variants,
    textStyle?: StyleProp<TextStyle>
} 

export const Button = ({text, onPress, style, textVariant, textStyle}: ButtonProps) => {

    return (
        <TouchableOpacity style={[buttonStyle.btn, style]} onPress={onPress}>
            <Typography variant={textVariant} style={textStyle}>
                {text}
            </Typography>
        </TouchableOpacity>
    )
}

const buttonStyle = StyleSheet.create({
    btn: {

    }
})