import { Note } from '@/shared/types/note';
import { Card } from '../../../shared/ui/card/card';
import { Typography } from '../../../shared/ui/typography/typography';

type CardNoteProps = {
	note: Note
};

export const CardNote = ({ note }: CardNoteProps) => {
	return (
		<Card>
			<Typography textColor='secondary'>{note.description}</Typography>
		</Card>
	);
};
