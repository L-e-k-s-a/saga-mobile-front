import { COLORS } from "@/shared/constants/colors"
import { StyleSheet, View, ActivityIndicator, StyleProp, ViewStyle } from "react-native"


type SpinnerProps = {
    width?: number
    height?: number
    style?: StyleProp<ViewStyle>
}


export const Spinner = ({width, height, style}: SpinnerProps) => {

    const getSize = () => {
        if(width === undefined || height === width === undefined){
            return {flex: 1}
        }
        return { width: width, height: height }
    }

    return(
        <View style={[styles.container, getSize(), style]}>
            <ActivityIndicator size="large" color={COLORS.secondary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})