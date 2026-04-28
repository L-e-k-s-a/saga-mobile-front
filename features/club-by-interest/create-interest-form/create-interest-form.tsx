import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { useUserStore } from '@/shared/store/user/user-store';
import { styleForm } from '@/shared/styles/forms';
import { Interest } from '@/shared/types/interest';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSaveInterest } from '../hooks/use-save-interest';

type CreateInterestFormProps = {
	setIsVisible: (isVisible: boolean) => void
}

export const CreateInterestForm = ({setIsVisible}: CreateInterestFormProps) => {
	const { activeFamily } = useUserStore();
	const { saveInterest } = useSaveInterest();
	const [form, setForm] = useState<Interest>({
		interesId: '',
		familyId: activeFamily,
		title: '',
		moreDetails: '',
	});

	const disabled = form.title === '' || form.moreDetails === '';

	const handleChangeForm = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSaveInterest = () => {
		saveInterest(form)
		setIsVisible(false)
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
				text='Сохранить'
				onPress={handleSaveInterest}
				disabled={disabled}
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
		fontSize: 14,
	},
});
