
import { AlignContainer } from "@/shared/layouts/AlignContainer/AlignContainer"
import { BackgroundContainer } from "@/shared/layouts/BackgroundContainer/BackgroundContainer"
import { Button } from "@/shared/ui/Button/Button"

export const Tasks = () => {
    return(
        <BackgroundContainer>
            <AlignContainer>
                <Button text="1" size="s" variant="primary" onPress={() => {}}/>
                <Button text="1" size="m" variant="secondary" onPress={() => {}}/>
                <Button text="1" size="l" variant="primary" onPress={() => {}}/>

            </AlignContainer>
        </BackgroundContainer>
    )
}