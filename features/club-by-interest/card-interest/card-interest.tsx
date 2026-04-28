import { Interest } from "@/shared/types/interest"
import { Card } from "@/shared/ui/card/card"
import { Typography } from "@/shared/ui/typography/typography"
import { StyleSheet } from "react-native"


type CardInterestProps = {
    interest: Interest
}

export const CardInterest = ({interest}: CardInterestProps) => {
    return (
        <Card>
            <Typography variant="h3" textColor="secondary" style={styleCardInterest.title}>{interest.title}</Typography>
            <Typography textColor="secondary">{interest.moreDetails}</Typography>
        </Card>
    )
}


const styleCardInterest = StyleSheet.create({
    title: {
        width: "100%",
        textAlign: 'center'
    }
})