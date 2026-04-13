import { NoteFamilyDiary } from "@/features/note-family-diary/note-family-diary"
import { AlignContainer } from "@/shared/layouts/AlignContainer/AlignContainer"
import { BackgroundContainer } from "@/shared/layouts/BackgroundContainer/BackgroundContainer"
import { Button } from "@/shared/ui/Button/Button"


export const FamilyDiary = () => {
    return (
        <BackgroundContainer>
            <AlignContainer>
                <NoteFamilyDiary />
            </AlignContainer>
        </BackgroundContainer>
    )
}