import { VerLayout } from "@/shared/layouts/VerLayout/VerLayout"
import { ReactNode, useState } from "react"
import { Typography } from "../typography/typography"
import { TouchableOpacity } from "react-native"
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
        <VerLayout>
            <HorLayout>
                <Typography>{title}</Typography>
                <TouchableOpacity>
                    <Ionicons name={isDrop ? 'chevron-up' : 'chevron-down'} color={COLORS.white}/>
                </TouchableOpacity>
            </HorLayout>
            {isDrop && content}
        </VerLayout>
    )
}