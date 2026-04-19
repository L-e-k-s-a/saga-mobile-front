import { db } from '@/firebase/firebase';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { generateInviteCode } from '@/shared/lib/generate-invate-code';
import { useMe } from '@/shared/store/me/useMe';
import { styleForm } from '@/shared/styles/forms';
import { styleModal } from '@/shared/styles/modal';
import { CreateFamilyFormType } from '@/shared/types/create-family-form-type';
import { Button } from '@/shared/ui/buttons/Button/Button';
import { DropDownPositionInFamily } from '@/shared/ui/drop-down-position-in-family/drop-down-position-in-family';
import { Input } from '@/shared/ui/Input/Input';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

type CreateFamilyFormProps = {
	setIsVisible: (isVisible: boolean) => void;
};

export const CreateFamilyForm = ({ setIsVisible }: CreateFamilyFormProps) => {
	const [formFamily, setFormFamily] = useState<CreateFamilyFormType>({
		nameFamily: '',
		positionInFamily: '',
	});
	const user = useMe();

	const valid = () => {
		if (formFamily.nameFamily === '' || formFamily.positionInFamily == '') {
			return false;
		}
	};

	const handleSaveFamily = async () => {
		if (!valid()) {
			return;
		}

		const familyRef = await addDoc(collection(db, 'families'), {
			nameFamily: formFamily.nameFamily,
			inviteCode: generateInviteCode(),
		});

		await addDoc(collection(db, 'familyMembers'), {
			familyId: familyRef.id,
			userId: user?.uid,
			positionInFamily: formFamily.positionInFamily,
		});
	};

	const handleFormFamilyChange = (field: string, value: string) => {
		setFormFamily((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<VerLayout
			styles={[styleModal.modalContent, styleCreateFamilyForm.content]}>
			<Input
				placeholder='Название семьи'
				value={formFamily.nameFamily}
				style={styleForm.input}
				onChangeText={(text) => handleFormFamilyChange('nameFamily', text)}
			/>
			<DropDownPositionInFamily
				form={formFamily}
				title='Положение в семье'
				onFormChange={handleFormFamilyChange}
			/>
			<HorLayout style={styleCreateFamilyForm.buttons}>
				<Button
					variant='secondary'
					text='Закрыть'
					onPress={() => setIsVisible(false)}
					style={styleCreateFamilyForm.buttonClose}
				/>
				<Button
					variant='secondary'
					size='m'
					text='Сохранить'
					onPress={() => {
						handleSaveFamily();
						setIsVisible(false);
					}}
					style={styleCreateFamilyForm.buttonSave}
				/>
			</HorLayout>
		</VerLayout>
	);
};

const styleCreateFamilyForm = StyleSheet.create({
	content: {
		alignItems: 'center',
		gap: 10,
	},
	buttons: {
		width: '100%',
		justifyContent: 'space-between',
	},
	buttonClose: {
		width: '28%',
	},
	buttonSave: {
		width: '70%',
	},
});
