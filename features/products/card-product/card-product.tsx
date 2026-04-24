import { Card } from "@/shared/ui/card/card"
import { Checkbox } from "@/shared/ui/checkbox/checkbox"

type CardProductProps = {
    product: string[]
}

export const CardProduct = ({product}: CardProductProps) => {
    return (
        <Card>
            <Checkbox label="lavel"/>
        </Card>
    )
}