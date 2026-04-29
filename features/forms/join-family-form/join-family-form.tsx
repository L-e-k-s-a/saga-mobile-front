import { findFamilyByInviteCode } from '@/entities/family/lib/find-family-by-invite-code';
import { db } from '@/firebase/firebase';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';

import { useMe } from '@/shared/store/me/useMe';
import { styleForm } from '@/shared/styles/forms';
import { JoinFamilyFormType } from '@/shared/types/join-family-form-type';
import { Button } from '@/shared/ui/buttons/button/Button';
import { DropDownPositionInFamily } from '@/shared/ui/drop-down-position-in-family/drop-down-position-in-family';
import { Input } from '@/shared/ui/Input/Input';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

type JoinFamilyFormProps = {
	setIsVisible: (isVisible: boolean) => void;
};

export const JoinFamilyForm = ({ setIsVisible }: JoinFamilyFormProps) => {
	const [formFamily, setFormFamily] = useState<JoinFamilyFormType>({
		inviteCode: '',
		positionInFamily: '',
		role: '',
	});
	const me = useMe();
	const disabled = formFamily.inviteCode === '' || formFamily.positionInFamily == ''

	const handleJoinFamily = async () => {
		const meId = me.uid;
		const family = await findFamilyByInviteCode(formFamily.inviteCode);
		if (family) {
			await addDoc(collection(db, 'familyMembers'), {
				familyId: family.id,
				userId: meId,
				positionInFamily: formFamily.positionInFamily,
				role: formFamily.role,
			});
		}
	};

	const handleFormFamilyChange = (field: string, value: string) => {
		setFormFamily((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<VerLayout styles={styleCreateFamilyForm.content}>
			<Input
				placeholder='Код другой семьи'
				value={formFamily.inviteCode.toUpperCase()}
				style={styleForm.input}
				onChangeText={(text) => handleFormFamilyChange('inviteCode', text)}
			/>
			<DropDownPositionInFamily
				form={formFamily}
				onFormChange={handleFormFamilyChange}
			/>
			<HorLayout style={styleCreateFamilyForm.buttons}>
				<Button
					size='m'
					text='Вперёд'
					onPress={() => {
						handleJoinFamily();
						setIsVisible(false);
					}}
					style={styleCreateFamilyForm.buttonSave}
					disabled={disabled}
				/>
				<Button
					text='Закрыть'
					onPress={() => setIsVisible(false)}
					style={styleCreateFamilyForm.buttonClose}
				/>
			</HorLayout>
		</VerLayout>
	);
};

const styleCreateFamilyForm = StyleSheet.create({
	content: {
		alignContent: 'center',
		gap: 10,
		paddingHorizontal: 20,
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
