import { View } from "react-native"
import { Typography } from "../Typography/Typography"

type EmptyStateProps = {
    text: string
}

export const EmptyState = ({text}: EmptyStateProps) => {
    return (
        <View>
            <Typography>
                {text}
            </Typography>
        </View>
    )
}