import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleModal } from '@/shared/styles/modal';
import { NoteFamilyDiaryType } from '@/shared/types/note-family-diary';
import { Button } from '@/shared/ui/Button/Button';
import { EmptyState } from '@/shared/ui/empty-state/empty-state';
import { Note } from '@/shared/ui/note/note';
import { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export const NoteFamilyDiary = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const notes: NoteFamilyDiaryType[] = [];

	const handleClickAddNote = () => {
		setIsModalVisible(!isModalVisible)
	};

	const handlerClose = () => {
		setIsModalVisible(!isModalVisible)
	}

	const handleSave = () => {
		setIsModalVisible(!isModalVisible)
	}

	return (
		<VerLayout styles={styleFamilyDiary.container}>
			{notes.length > 0 ? (
				notes.map((note: NoteFamilyDiaryType) => <Note text={note.text} />)
			) : (
				<EmptyState text='Быстрее добавьте хотя бы одну запись!' />
			)}
			<Button
				text='Добавить'
				variant='secondary'
				onPress={handleClickAddNote}
				style={styleFamilyDiary.add}
			/>
			<Modal
				visible={isModalVisible}
				animationType='fade'
				transparent={true} 
			>
				<VerLayout
					styles={styleModal.modalOverlay}
				>
					<VerLayout styles={styleModal.modalContent}>
						<VerLayout styles={styleFamilyDiary.inner}>
							<TextInput 
							style={styleFamilyDiary.textArea}
							multiline={true}
							/>
							<HorLayout style={styleFamilyDiary.btns}>
								<Button text="Закрыть" size='s' variant='secondary' onPress={handlerClose}/>
								<Button text="Сохранить" size='s' variant='secondary' onPress={handleSave}/>
							</HorLayout>
						</VerLayout>
					</VerLayout>
				</VerLayout>
			</Modal>
		</VerLayout>
	);
};

const styleFamilyDiary = StyleSheet.create({
	container: {
		flex: 1,
	},
	add: {
		position: 'absolute',
		bottom: 85,
		right: 0,
		width: 95,
	},
	textArea: {
		height: 400,
		borderWidth: 1,
		padding: 5,
		fontSize: 16
	},
	inner: {
		gap: 15
	},
	btns: {
		justifyContent: 'space-between'
	}
});
