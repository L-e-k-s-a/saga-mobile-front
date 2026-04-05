import { Ionicons } from "@expo/vector-icons"
import { Typography } from "../Typography/Typography"
import { useState } from "react"
import { TouchableOpacity, StyleSheet, View, ScrollView, Modal } from "react-native"
import { ICON_SIZE } from "@/shared/constants/iconSize"
import { COLORS } from "@/shared/constants/colors"
import { HorLayout } from "@/shared/layouts/HorLayout/HorLayout"
import { BORDER_RADII } from "@/shared/constants/borderRadii"
import { PADDINGS } from "@/shared/constants/paddings"
import { FONT_SIZE } from "@/shared/constants/font-size"
import { capitalize } from "@/shared/lib/capitalize"

type DropDownRegisterFormProps = {
    title: string,
    items: Item[],
    onSelect: (item: Item) => void
}

type Item = {
    role: string,
    ru: string,
}

export const DropDownRegisterForm = ({title, items, onSelect}: DropDownRegisterFormProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [select, setSelect] = useState<Item>()
    const [buttonPosition, setButtonPosition] = useState({ y: 0, height: 0 })

    const handleDropDown = () => {
        setIsVisible(!isVisible)
    }

    const handleSelect = (item: Item) => {
        setSelect(item)
        setIsVisible(false)
        onSelect?.(item)
    }

    const onLayout = (event: any) => {
        const { y, height } = event.nativeEvent.layout
        setButtonPosition({ y, height })
    }

    return(
        <>
            <View 
                style={styleDropDown.dropDown} 
            >
                <Typography style={styleDropDown.title} variant="h3">
                    {select?.ru ? capitalize(select.ru) : capitalize(title)}
                </Typography>
                <TouchableOpacity style={styleDropDown.icon} onPress={handleDropDown}>
                    <Ionicons 
                        name={isVisible ? 'arrow-up' : 'arrow-down'} 
                        size={ICON_SIZE.primary} 
                        color={COLORS.secondary}
                    />
                </TouchableOpacity>
            </View>

            <Modal
                visible={isVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsVisible(false)}
            >
                <TouchableOpacity 
                    style={styleDropDown.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsVisible(false)}
                >
                    <View 
                        style={[
                            styleDropDown.dropdownList,
                            {
                                bottom: 140,
                                left: 0,
                                right: 0,
                            }
                        ]}
                        onLayout={onLayout}
                    >
                        <ScrollView>
                            {items.map((item: Item) => (
                                <TouchableOpacity 
                                    key={item.role} 
                                    onPress={() => handleSelect(item)}
                                    style={styleDropDown.dropdownItem}
                                >
                                    <Typography style={styleDropDown.text}>
                                        {capitalize(item.ru)}
                                    </Typography>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    )
}

const styleDropDown = StyleSheet.create({
    dropDown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: BORDER_RADII.primary,
        height: 52,
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: COLORS.white,
        zIndex: 1,
    },
    title: {
        paddingLeft: PADDINGS.px16,
    },
    icon: {
        padding: PADDINGS.px10,
        paddingRight: PADDINGS.px16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)', // Полупрозрачный фон
    },
    dropdownList: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADII.primary,
        borderWidth: 1,
        maxHeight: 200,
        marginHorizontal: PADDINGS.px16, // Отступы по бокам
        zIndex: 1000,
        elevation: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    dropdownItem: {
        paddingVertical: PADDINGS.px16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.secondary,
    },
    text: {
        color: COLORS.black,
        paddingLeft: PADDINGS.px16,
        fontSize: FONT_SIZE.primary
    }
})