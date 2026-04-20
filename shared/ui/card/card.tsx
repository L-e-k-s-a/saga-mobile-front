
import type { ReactNode } from "react"
import {StyleSheet, View} from 'react-native'

type CardProps = {
    children: ReactNode
}

export const Card = ({children}: CardProps) => {
    return(
        <View style={styles.card}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: "flex",
        justifyContent: "space-evenly"
    }
})

