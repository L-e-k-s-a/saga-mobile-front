import { Card } from '../../../shared/ui/card/card';
import { Typography } from '../../../shared/ui/typography/typography';

type CardNoteProps = {
	text: string;
};

export const CardNote = ({ text }: CardNoteProps) => {
	return (
		<Card>
			<Typography>{text}</Typography>
		</Card>
	);
};
