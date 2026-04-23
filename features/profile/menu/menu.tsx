import { HorLayout } from "@/shared/layouts/HorLayout/HorLayout"
import { VerLayout } from "@/shared/layouts/VerLayout/VerLayout"
import { useAuthStore } from "@/shared/store"
import { Button } from "@/shared/ui/buttons/button/Button"
import { Ionicons } from "@expo/vector-icons"


export const Menu = () => {

    const { logout } = useAuthStore()

    return (
        <VerLayout>
            <HorLayout>
                <Ionicons />
                <Button text="Выйти" onPress={logout}/>
            </HorLayout>
        </VerLayout>
    )
}