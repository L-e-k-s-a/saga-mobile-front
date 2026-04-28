import { Interest } from "@/shared/types/interest"
import { Card } from "@/shared/ui/card/card"
import { Typography } from "@/shared/ui/typography/typography"


type CardInterestProps = {
    interest: Interest
}

export const CardInterest = ({interest}: CardInterestProps) => {
    return (
        <Card>
            <Typography variant="h3" textColor="secondary">{interest.title}</Typography>
            <Typography textColor="secondary">{interest.moreDetails}</Typography>
        </Card>
    )
}