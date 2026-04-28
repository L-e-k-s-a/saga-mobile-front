import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { useUserStore } from '@/shared/store/user/user-store';
import { Note } from '@/shared/types/note';
import { Button } from '@/shared/ui/buttons/button/Button';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useSaveNote } from '../hooks/use-save-note';

type CreateNoteProps = {
	setIsVisible: (isVisible: boolean) => void;
};

export const CreateNote = ({ setIsVisible }: CreateNoteProps) => {
	const { activeFamily } = useUserStore();
	const { saveNote } = useSaveNote();
	const [note, setNote] = useState<Note>({
		familyId: activeFamily,
		description: '',
	});

	const disabled = note.description === '';

	const handleSave = () => {
		saveNote(note);
		setIsVisible(false);
	};

	return (
		<VerLayout styles={styleFamilyDiary.container}>
			<TextInput
				style={styleFamilyDiary.textArea}
				value={note.description}
				onChangeText={(text) =>
					setNote((prev) => ({ ...prev, description: text }))
				}
				multiline={true}
			/>
			<Button
				text='Сохранить'
				size='m'
				onPress={handleSave}
				disabled={disabled}
				fullWidth
			/>
		</VerLayout>
	);
};

const styleFamilyDiary = StyleSheet.create({
	container: {
		gap: 15,
	},
	textArea: {
		height: 400,
		borderWidth: 1,
		padding: 5,
		fontSize: 16,
	},
});
