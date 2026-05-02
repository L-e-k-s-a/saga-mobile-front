import { CreateNoteModal } from '@/features/family-diary/create-note-modal/create-note-modal';
import { NoteGroup } from '@/features/family-diary/note-group/note-group';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { useUserStore } from '@/shared/store/user/user-store';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { useState } from 'react';

export const FamilyDiaryWidget = () => {
	const { activeFamily } = useUserStore()
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
				{ activeFamily && <ButtonAdd action={handleCreateNote} />}
			</AlignContainer>
		</BackgroundContainer>
	);
};
