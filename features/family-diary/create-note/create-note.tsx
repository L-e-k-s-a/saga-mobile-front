import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { NoteFamilyDiaryType } from '@/shared/types/note-family-diary';
import { ButtonCross } from '@/shared/ui/buttons/button-cross/button-cross';
import { Button } from '@/shared/ui/buttons/button/Button';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';


type CreateNoteProps = {
	setIsVisible: (isVisible: boolean) => void
}

export const CreateNote = ({setIsVisible}: CreateNoteProps) => {
	const [note, setNote] = useState('');
	const [disabled, setDisabled] = useState(false)

	useEffect(() => {
		if(note === ''){
			setDisabled(true)
		}else{
			setDisabled(false)
		}
	}, [note])


	const handleSave = () => {
		setIsVisible(false)
	};

	return (
		<VerLayout styles={styleFamilyDiary.container}>
				<ButtonCross close={() => setIsVisible(false)}/>
				<TextInput
					style={styleFamilyDiary.textArea}
					value={note}
					onChangeText={(text) => setNote(text)}
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
		gap: 15
	},
	textArea: {
		height: 400,
		borderWidth: 1,
		padding: 5,
		fontSize: 16,
	},
});
