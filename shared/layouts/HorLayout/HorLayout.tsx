
import type { ReactNode } from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

type HorLayoutProps = {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
}

export const HorLayout = ({children, style}: HorLayoutProps) => {
    return (
        <View style={[styles.layout, style]}>
            {children}
        </View>
    )
} 

const styles = StyleSheet.create({
    layout: { 
        flexDirection: "row",
    }
})
