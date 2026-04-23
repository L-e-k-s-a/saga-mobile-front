import { CreateNoteModal } from '@/features/family-diary/create-note-modal/create-note-modal';
import { NoteGroup } from '@/features/family-diary/note-group/note-group';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { useState } from 'react';

export const FamilyDiaryWidget = () => {
	const [isVisibleModalCreateNote, setIsVisibleModalCreateNote] =
		useState(false);

	const handleCreateNote = () => {
		setIsVisibleModalCreateNote(true);
	};

	return (
		<BackgroundContainer>
			<AlignContainer>
				<NoteGroup />
				<CreateNoteModal
					isVisible={isVisibleModalCreateNote}
					setIsVisible={setIsVisibleModalCreateNote}
				/>
				<ButtonAdd action={handleCreateNote} />
			</AlignContainer>
		</BackgroundContainer>
	);
};
