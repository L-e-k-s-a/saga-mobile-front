import { SettingsFavorite } from "@/features/settings-favorite/settings-favorite"
import { AlignContainer } from "@/shared/layouts/AlignContainer/AlignContainer"
import { BackgroundContainer } from "@/shared/layouts/BackgroundContainer/BackgroundContainer"



export const SettingsFavoriteWidget = () => {
    return (
        <BackgroundContainer>
            <AlignContainer>
                <SettingsFavorite />
            </AlignContainer>
        </BackgroundContainer>
        
    )
}