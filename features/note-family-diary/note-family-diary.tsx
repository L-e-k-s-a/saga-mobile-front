import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleModal } from '@/shared/styles/modal';
import { NoteFamilyDiaryType } from '@/shared/types/note-family-diary';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { Button } from '@/shared/ui/buttons/button/Button';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Note } from '@/shared/ui/note/note';
import { useState } from 'react';
import { Modal, StyleSheet, TextInput } from 'react-native';

export const NoteFamilyDiary = () => {
	const [note, setNote] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);

	const notes: NoteFamilyDiaryType[] = [];

	const handleClickAddNote = () => {
		setIsModalVisible(!isModalVisible);
	};

	const handlerClose = () => {
		setIsModalVisible(!isModalVisible);
	};

	const handleSave = () => {
		setIsModalVisible(!isModalVisible);
	};

	return (
		<VerLayout styles={styleFamilyDiary.container}>
			{notes.length > 0 ? (
				notes.map((note: NoteFamilyDiaryType) => <Note text={note.text} />)
			) : (
				<NoData
					title='Ничего нет'
					desctiption='Быстрее добавьте хотя бы одну запись!'
				/>
			)}
			<Modal
				visible={isModalVisible}
				animationType='fade'
				transparent={true}>
				<VerLayout styles={styleModal.modalOverlay}>
					<VerLayout styles={styleModal.modalContent}>
						<VerLayout styles={styleFamilyDiary.inner}>
							<TextInput
								style={styleFamilyDiary.textArea}
								multiline={true}
							/>
							<HorLayout style={styleFamilyDiary.btns}>
								<Button
									text='Закрыть'
									size='s'
									variant='secondary'
									onPress={handlerClose}
								/>
								<Button
									text='Сохранить'
									size='m'
									variant='secondary'
									onPress={handleSave}
								/>
							</HorLayout>
						</VerLayout>
					</VerLayout>
				</VerLayout>
			</Modal>
			<ButtonAdd action={handleClickAddNote} />
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
	btns: {
		justifyContent: 'space-between',
	},
});
