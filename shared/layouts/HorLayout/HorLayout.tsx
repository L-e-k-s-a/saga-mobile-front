
import type { ReactNode } from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

type HorLayoutProps = {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
    onLayout?: any
}

export const HorLayout = ({children, style, onLayout}: HorLayoutProps) => {
    return (
        <View style={[styles.layout, style]} onLayout={onLayout}>
            {children}
        </View>
    )
} 

const styles = StyleSheet.create({
    layout: { 
        flexDirection: "row",
    }
})
