import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

type LineProps = {
    style: StyleProp<ViewStyle>
}

export const Line = ({style}: LineProps) => {
    return (
        <View style={style} />
    )
}

