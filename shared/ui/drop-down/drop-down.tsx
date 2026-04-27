import { VerLayout } from "@/shared/layouts/VerLayout/VerLayout"
import { ReactNode, useState } from "react"
import { Typography } from "../typography/typography"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "@/shared/constants/colors"
import { HorLayout } from "@/shared/layouts/HorLayout/HorLayout"


type DropDownProps = {
    title: string,
    content: ReactNode
}

export const DropDown = ({title, content}: DropDownProps) => {
    
    const [isDrop, setIsDrop] = useState(false)
    
    return (
        <VerLayout styles={styleDropDown.dropDown}>
            <HorLayout style={styleDropDown.sectionHeader}>
                <Typography variant="h3">{title}</Typography>
                <TouchableOpacity onPress={() => setIsDrop(!isDrop)}>
                    <Ionicons name={isDrop ? 'chevron-up' : 'chevron-down'} color={COLORS.white} size={24}/>
                </TouchableOpacity>
            </HorLayout>
            <VerLayout styles={styleDropDown.sectionList}>
                {isDrop && content} 
            </VerLayout>
        </VerLayout>
    )
}

const styleDropDown = StyleSheet.create({
    dropDown: {
        width: "100%",
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 15
    },
    sectionHeader: {
        justifyContent: 'space-between',
        width: '100%',
    },
    sectionList: {
        gap: 5
    }

})