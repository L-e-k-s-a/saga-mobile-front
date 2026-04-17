import { FAMILY_MEMBERS_ROLE } from '@/shared/constants/family/family-role-members';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { styleModal } from '@/shared/styles/modal';
import { CreateFamilyFormType } from '@/shared/types/create-family-form';
import { Button } from '@/shared/ui/Button/Button';
import { DropDownPositionInFamily } from '@/shared/ui/drop-down-position-in-family/drop-down-position-in-family';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';

type CreateFamilyFormProps = {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
	setIsVisibleActionFamily: () => void;
};

export const CreateFamilyForm = ({
	isVisible,
	setIsVisible,
	setIsVisibleActionFamily,
}: CreateFamilyFormProps) => {
	const [formFamily, setFormFamily] = useState<CreateFamilyFormType>({
		nameFamily: '',
		positionInFamily: '',
	});

	const handleFormFamilyChange = (field: string, value: string) => {
		setFormFamily((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<Modal
			visible={isVisible}
			transparent={true}>
			<VerLayout styles={[styleForm.section, styleModal.modalOverlay]}>
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
						items={FAMILY_MEMBERS_ROLE}
						onFormChange={handleFormFamilyChange}
					/>
					<Button
						variant='secondary'
						size='m'
						text='Сохранить'
						onPress={() => {
							setIsVisible(false);
							setIsVisibleActionFamily();
						}}
					/>
				</VerLayout>
			</VerLayout>
		</Modal>
	);
};

const styleCreateFamilyForm = StyleSheet.create({
	content: {
		alignItems: 'center',
		gap: 10
	},
});
