import { FAMILY_MEMBERS_ROLE } from '@/shared/constants/family/family-role-members';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { CreateFamilyFormType } from '@/shared/types/create-family-form';
import { DropDownPositionInFamily } from '@/shared/ui/drop-down-register-form/drop-down-register-form';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useState } from 'react';
import { Modal } from 'react-native';

export const CreateFamilyForm = () => {
	const [formFamily, setFormFamily] = useState<CreateFamilyFormType>({
		nameFamily: '',
		positionInFamily: '',
	});

	const handleFormFamilyChange = (field: string, value: string) => {};

	return (
		<Modal
			visible={true}
			transparent={true}>
			<VerLayout styles={styleForm.section}>
				<Typography variant='h3'>Кто Вы?</Typography>
				<DropDownPositionInFamily
					form={formFamily}
					title='Положение в семье'
					items={FAMILY_MEMBERS_ROLE}
					onFormChange={handleFormFamilyChange}
				/>
			</VerLayout>
		</Modal>
	);
};
