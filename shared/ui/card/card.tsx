
import { COLORS } from "@/shared/constants/colors"
import { VerLayout } from "@/shared/layouts/VerLayout/VerLayout"
import type { ReactNode } from "react"
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'

type CardProps = {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
}

export const Card = ({children, style}: CardProps) => {
    return(
        <VerLayout styles={[styleCard.card, style]}>
            {children}
        </VerLayout>
    )
}

const styleCard = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,        
        borderRadius: 8,        
        padding: 16,            
        margin: 8,              
    }
})