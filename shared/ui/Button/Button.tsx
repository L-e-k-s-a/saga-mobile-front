import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Typography } from "../Typography/Typography"
import { COLORS } from "@/shared/constants/colors"
import { Variants } from "@/shared/types/typography"
import { PADDINGS } from "@/shared/constants/paddings"
import { BORDER_RADII } from "@/shared/constants/borderRadii"

type VariantsBtn = 'primary' | "secondary"

type Size = "s" | "m" | "l"

type ButtonProps = {
    text: string,
    variant?: VariantsBtn
    size?: Size
    style?: StyleProp<ViewStyle>
    textVariant?: Variants,
    textStyle?: StyleProp<TextStyle>
    onPress: () => void,
} 

export const Button = ({text, onPress, style, textVariant, textStyle, variant = "primary", size = "m"}: ButtonProps) => {

    const getVariantButton = (variant: VariantsBtn) => {
        return buttonStyle[variant]
    }

    const getSize = (size: Size) => {
        return buttonStyle[size]
    }

    const getStyleText = () => {
        if(variant === 'primary'){
            return buttonStyle['textPrimary']
        }else if(variant === 'secondary'){
            return buttonStyle['textSecondary']
        }
    }

    return (
        <TouchableOpacity style={[getVariantButton(variant), getSize(size), style]} onPress={onPress}>
            <Typography variant={textVariant} style={[getStyleText(), textStyle]}>
                {text}
            </Typography>
        </TouchableOpacity>
    )
}


const common = {
    borderRadius: BORDER_RADII.px10,
    borderWidth: 1,
    width: 150,
    alignItems: 'center'
} as const

const buttonStyle = StyleSheet.create({
    primary: {
        backgroundColor: COLORS.primary,
        ...common,
    },
    secondary: {
        backgroundColor: COLORS.secondary,
        ...common,
    },
    s: {
        padding: PADDINGS.px10,
        width: 90
    },

    m: {
        padding: PADDINGS.px16
    },

    l: {
        padding: PADDINGS.px24
    },
    textPrimary: {
        color: COLORS.black,
    },
    textSecondary: {
        color: COLORS.white
    }
})