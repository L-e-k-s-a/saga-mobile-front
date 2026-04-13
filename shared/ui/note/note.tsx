import { Card } from "../Card/Card"
import { Typography } from "../Typography/Typography"

type NoteProps = {
    text: string
}

export const Note = ({text}: NoteProps) => {
    return(
        <Card>
            <Typography>
                {text}    
            </Typography>
        </Card>
    )
}