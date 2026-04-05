import { Ionicons } from "@expo/vector-icons"
import { Typography } from "../Typography/Typography"
import { useState } from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { ICON_SIZE } from "@/shared/constants/iconSize"
import { COLORS } from "@/shared/constants/colors"
import { HorLayout } from "@/shared/layouts/HorLayout/HorLayout"
import { BORDER_RADII } from "@/shared/constants/borderRadii"
import { PADDINGS } from "@/shared/constants/paddings"


type DropDownRegisterFormProps = {
    title: string,
    items: Item[],
    onSelect: (item: Item) => void
}

type Item = {
    role: string,
    ru: string,
}

export const DropDownRegisterForm = ({title, items}: DropDownRegisterFormProps) => {

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [select, setSelect] = useState<Item>()

    const handleDrop = () => {
        setIsVisible(!isVisible)
    }

    const handleSelect = (item: Item) => {
        setSelect(item)
    }

    return(
        <HorLayout style={styleDropDown.dropDown}>
            <Typography style={styleDropDown.title} variant="h3">{title}</Typography>
            {isVisible && 
                items.map((item: Item) => (
                    <TouchableOpacity onPress= {() => handleSelect(item)}>
                        <Typography>{item.ru}</Typography>
                    </TouchableOpacity>
                ))
            }
            <TouchableOpacity style={styleDropDown.icon} onPress={handleDrop}>
                <Ionicons name='arrow-down' size={ICON_SIZE.primary} color={COLORS.secondary}/>
            </TouchableOpacity>
        </HorLayout>
    )
}

const styleDropDown = StyleSheet.create({
    dropDown: {
        justifyContent: 'space-between',
        borderRadius: BORDER_RADII.primary,
        height: 52,
        borderWidth: 1,
        alignItems: 'center'
    },
    title: {
        paddingLeft: PADDINGS.px16
    },
    icon: {
        padding: PADDINGS.px10,
        paddingRight: PADDINGS.px16,
    }
})