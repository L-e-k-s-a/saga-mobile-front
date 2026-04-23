import { useUserStore } from "@/shared/store/user/user-store"
import { Card } from "@/shared/ui/card/card"
import { Typography } from "@/shared/ui/typography/typography"



export const ProfileView = () => {

    const { name, surname, patronymic } = useUserStore()

    return(
        <Card>
            <Typography variant="h3" textColor="secondary">{surname}</Typography>
            <Typography variant="h3" textColor="secondary">{name}</Typography>
            <Typography variant="h3" textColor="secondary">{patronymic}</Typography>
        </Card>
    )
}
