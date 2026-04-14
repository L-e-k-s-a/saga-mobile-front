import { FamilyActionSelect } from "@/features/forms/family-select-action/family-select-action"
import { AlignContainer } from "@/shared/layouts/AlignContainer/AlignContainer"
import { BackgroundContainer } from "@/shared/layouts/BackgroundContainer/BackgroundContainer"



export const FamilyActionSelectWidget = () => {
    return (
        <BackgroundContainer>
            <AlignContainer>
                <FamilyActionSelect />
            </AlignContainer>
        </BackgroundContainer>
    )
}