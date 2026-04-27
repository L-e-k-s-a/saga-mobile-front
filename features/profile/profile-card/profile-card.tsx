import { useUserStore } from "@/shared/store/user/user-store"
import { Card } from "@/shared/ui/card/card"
import { Typography } from "@/shared/ui/typography/typography"
import { ProfileImage } from "../profile-image/profile-image"
import { HorLayout } from "@/shared/layouts/HorLayout/HorLayout"
import { VerLayout } from "@/shared/layouts/VerLayout/VerLayout"
import { StyleSheet } from "react-native"




export const ProfileView = () => {

    const { name, surname, patronymic } = useUserStore()

    return(
        <Card>
            <HorLayout style={styleProfileView.container}>
                <ProfileImage />
                <VerLayout styles={styleProfileView.snp}>
                    <Typography variant="h3" textColor="secondary">{surname}</Typography>
                    <Typography variant="h3" textColor="secondary">{name}</Typography>
                    <Typography variant="h3" textColor="secondary">{patronymic}</Typography>
                </VerLayout>
            </HorLayout>
        </Card>
    )
}

const styleProfileView = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 10
    },
    snp: {
        gap: 5
    }
})