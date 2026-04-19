import { db } from '@/firebase/firebase';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { generateInviteCode } from '@/shared/lib/generate-invate-code';
import { updateOneDoc } from '@/shared/lib/updateOneDoc';
import { useFamilyStore } from '@/shared/store/family/family-store';
import { useMe } from '@/shared/store/me/useMe';
import { useUserStore } from '@/shared/store/user/user-store';
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
	const { setNameFamily, setRole } = useFamilyStore();
	const { countFamily, setCountFamily, setActiveFamily } = useUserStore();
	const { setInviteCode } = useFamilyStore();
	const [formFamily, setFormFamily] = useState<CreateFamilyFormType>({
		nameFamily: '',
		positionInFamily: '',
		role: '',
	});
	const me = useMe();

	const valid = () => {
		if (formFamily.nameFamily === '' || formFamily.positionInFamily == '') {
			return false;
		}
		return true;
	};

	const handleSaveFamily = async () => {
		if (!valid()) {
			return;
		}

		const meId = me.uid;

		const inviteCode = generateInviteCode();
		const createdFamilyRef = await addDoc(collection(db, 'families'), {
			nameFamily: formFamily.nameFamily,
			inviteCode: inviteCode,
			tasks: [],
		});

		await addDoc(collection(db, 'familyMembers'), {
			familyId: createdFamilyRef.id,
			userId: meId,
			positionInFamily: formFamily.positionInFamily,
			role: formFamily.role,
		});

		if (countFamily === 0) {
			setActiveFamily(createdFamilyRef.id);
			updateOneDoc('users', 'activeFamily', createdFamilyRef.id, meId);
			setInviteCode(inviteCode);
		}

		setRole(formFamily.role);
		setNameFamily(formFamily.nameFamily);
		setCountFamily(countFamily + 1);
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
