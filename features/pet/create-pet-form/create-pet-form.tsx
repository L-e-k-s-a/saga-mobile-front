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

export const CreatePetForm = () => {
    const [field, setField] = useState({
        nameField: '',
		description: '',
	})
    const [form, setForm] = useState([field]);
	const [isAddedInfo, setIsAddedInfo] = useState(false);

	const handleAddedInfo = () => {
		setIsAddedInfo(true);
	};

	return (
		<VerLayout styles={styleCreatePet.container}>
			<Input
				placeholder='Имя питомца'
				value=''
				style={styleForm.input}
			/>
			<DinamicScrollView
				maxHeight={300}
				style={styleCreatePet.containerFields}>
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
							onPress={() => setIsAddedInfo(false)}
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
			</DinamicScrollView>
			<Button
				text='Сохранить'
				onPress={() => {}}
				fullWidth
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
        alignItems: 'center'
    },
    spacer: {
        marginTop: 5
    }
});
