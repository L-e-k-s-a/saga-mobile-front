import { StyleProp, View, ViewStyle } from "react-native"

type VerLayoutProps = {
    children: React.ReactNode
    styles?: StyleProp<ViewStyle>
}


export const VerLayout = ({children, styles}: VerLayoutProps) => {
    return(
        <View style={[styles]}>
            {children}
        </View>
    )
}



