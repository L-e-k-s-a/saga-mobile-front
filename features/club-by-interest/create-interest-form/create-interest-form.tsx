import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { Interest } from '@/shared/types/interest';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export const CreateInterestForm = () => {
	const [form, setForm] = useState<Interest>({
		title: '',
		moreDetails: '',
	});

	const handleChangeForm = (field: string, value: string) => {
		setForm(prev => ({...prev, [field]: value}))
	}

	return (
		<VerLayout>
			<Input
				placeholder='Напишите тему интереса'
				value={form.title}
				style={styleForm.input}
				onChangeText={(text) => handleChangeForm('title', text)}
			/>
			<Input
				placeholder='Опишите подробнее, то чем хотели бы поделится'
				value={form.moreDetails}
				multiline={true}
				style={styleCreateInterestForm.textArea}
				onChangeText={(text) => handleChangeForm('moreDetails', text)}
			/>
			<Button 
				text="Сохранить"
				onPress={() => {}}
				fullWidth
			/>
		</VerLayout>
	);
};

const styleCreateInterestForm = StyleSheet.create({
	textArea: {
		height: 200,
		borderRadius: 5,
		marginVertical: 10,
		borderWidth: 1,
		color: COLORS.black,
		padding: 10,
		fontSize: 14	
	}
})