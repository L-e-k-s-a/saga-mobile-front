import { Card } from '../card/card';
import { Typography } from '../typography/typography';

type NoteProps = {
	text: string;
};

export const Note = ({ text }: NoteProps) => {
	return (
		<Card>
			<Typography>{text}</Typography>
		</Card>
	);
};
