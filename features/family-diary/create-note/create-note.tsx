import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { NoteFamilyDiaryType } from '@/shared/types/note-family-diary';
import { Button } from '@/shared/ui/buttons/button/Button';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export const CreateNote = () => {
	const [note, setNote] = useState('');

	const notes: NoteFamilyDiaryType[] = [];

	const handleClickAddNote = () => {};

	const handlerClose = () => {};

	const handleSave = () => {};

	return (
		<VerLayout styles={styleFamilyDiary.container}>
			<VerLayout styles={styleFamilyDiary.inner}>
				<TextInput
					style={styleFamilyDiary.textArea}
					multiline={true}
				/>
				<Button
					text='Сохранить'
					size='m'
					variant='secondary'
					onPress={handleSave}
					style={styleFamilyDiary.btn}
				/>
			</VerLayout>
		</VerLayout>
	);
};

const styleFamilyDiary = StyleSheet.create({
	container: {
		flex: 1,
	},
	textArea: {
		height: 400,
		borderWidth: 1,
		padding: 5,
		fontSize: 16,
	},
	inner: {
		gap: 15,
	},
	btn: {
		width: '100%',
	},
});
