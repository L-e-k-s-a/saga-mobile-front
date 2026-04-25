import { COLORS } from "@/shared/constants/colors"
import { VerLayout } from "@/shared/layouts/VerLayout/VerLayout"
import { Card } from "@/shared/ui/card/card"
import { Typography } from "@/shared/ui/typography/typography"
import { Ionicons } from "@expo/vector-icons"
import { FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { Photo } from "./photo/photo"




export const Album = () => {
    
    const photos = ['']

    return (
        <FlatList 
            data={photos}
            renderItem={({item}) => <Photo photo={item}/>}
        />

    )
}

