import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { Button } from '@/shared/ui/buttons/button/Button';
import { DinamicScrollView } from '@/shared/ui/dinamic-scroll-view/dinamic-scroll-view';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/typography/typography';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type Field = {
	nameField: string;
	description: string;
};

type PetForm = {
	namePet: string;
	petInfo: Field[];
};

export const CreatePetForm = () => {
	const [isAddedInfo, setIsAddedInfo] = useState(false);

	const [field, setField] = useState<Field>({
		nameField: '',
		description: '',
	});
	const [petInfo, setPetInfo] = useState<Field[]>([]);
	const [form, setForm] = useState<PetForm>({
		namePet: '',
		petInfo: [],
	});

	const disabledAdd = field.nameField === '' || field.description === '';
	const disabledSave = form.namePet === '';

	const handleAddedInfo = () => {
		setIsAddedInfo(true);
	};

	const handleSaveAddedInfo = () => {
		setIsAddedInfo(false);
		const newPetInfo = [...petInfo, field];
		setPetInfo(newPetInfo);
		setForm((prev) => ({ ...prev, petInfo: newPetInfo }));
		setField({ nameField: '', description: '' });
	};

	const handleFieldDelete = (indexDelete: number) => {
		const filtered = [...petInfo.filter((_, index) => index !== indexDelete)]
		setPetInfo(filtered);
		setForm(prev => ({...prev, petInfo: filtered}))
	};

	console.log(petInfo)

	return (
		<VerLayout styles={styleCreatePet.container}>
			<Input
				placeholder='Имя питомца'
				value={form.namePet}
				onChangeText={(text) => setForm((prev) => ({ ...prev, namePet: text }))}
				style={styleForm.input}
			/>
			<DinamicScrollView style={styleCreatePet.list} maxHeight={150}>
				{form.petInfo.length > 0 &&
					form.petInfo.map((item, index) => (
						<HorLayout style={styleCreatePet.field}>
							<HorLayout
								key={item.nameField + index}
								style={styleCreatePet.fieldLeft}>
								<Typography
									style={styleCreatePet.fieldTitle}
									textColor='secondary'>
									{item.nameField}:
								</Typography>
								<Typography
									style={styleCreatePet.description}
									textColor='secondary'>
									{item.description}
								</Typography>
							</HorLayout>
							<TouchableOpacity
								style={styleCreatePet.trash}
								onPress={() => handleFieldDelete(index)}>
								<Ionicons
									name='trash'
									size={24}
									color={COLORS.white}
								/>
							</TouchableOpacity>
						</HorLayout>
					))}
			</DinamicScrollView>
			<VerLayout styles={styleCreatePet.containerFields}>
				{isAddedInfo ? (
					<VerLayout styles={styleCreatePet.add}>
						<Input
							style={styleForm.input}
							placeholder='Название поля'
							value={field.nameField}
							onChangeText={(text) =>
								setField((prev) => ({ ...prev, nameField: text }))
							}
						/>
						<Input
							style={styleForm.input}
							placeholder='Описание'
							value={field.description}
							onChangeText={(text) =>
								setField((prev) => ({ ...prev, description: text }))
							}
						/>
						<Button
							style={styleCreatePet.spacer}
							text='Добавить'
							onPress={handleSaveAddedInfo}
							disabled={disabledAdd}
						/>
					</VerLayout>
				) : (
					<HorLayout style={styleCreatePet.addField}>
						<Typography
							variant='h3'
							textColor='secondary'>
							Добавить информацию
						</Typography>
						<TouchableOpacity
							style={styleCreatePet.addButton}
							onPress={handleAddedInfo}>
							<Ionicons
								name='add'
								size={24}
								color={COLORS.white}
							/>
						</TouchableOpacity>
					</HorLayout>
				)}
			</VerLayout>
			<Button
				text='Сохранить'
				onPress={() => {}}
				fullWidth
				disabled={disabledSave}
			/>
		</VerLayout>
	);
};

const styleCreatePet = StyleSheet.create({
	container: {
		gap: 10,
	},
	containerFields: {
		gap: 5,
	},
	addField: {
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	addButton: {
		backgroundColor: COLORS.secondary,
		padding: 10,
		borderRadius: 10,
	},
	add: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	list: {
		gap: 5
	},
	spacer: {
		marginTop: 5,
	},
	field: {
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	fieldLeft: {
		gap: 5,
	},
	fieldTitle: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	description: {
		fontSize: 16,
	},
	trash: {
		backgroundColor: COLORS.red,
		padding: 10,
		borderRadius: 10,
	},
});
