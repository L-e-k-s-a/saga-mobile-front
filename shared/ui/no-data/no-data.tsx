import { VerLayout } from "@/shared/layouts/VerLayout/VerLayout"
import { Typography } from "@/shared/ui/Typography/Typography"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"

type NoDataProps = {
    title?: string,
    desctiption?: string,
    style?: StyleProp<ViewStyle>
}

export const NoData = ({title = "Данных нет", desctiption = "Добавьте данные", style}: NoDataProps) => {
    return(
        <VerLayout styles={[style, styleNoData.noDataContainer]}>
            <Typography variant="h3">{title}</Typography>
            <Typography>{desctiption}</Typography>
        </VerLayout>
    )
}

const styleNoData = StyleSheet.create({
    noDataContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    } 
})

