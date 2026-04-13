import { BORDER_RADII } from '@/shared/constants/borderRadii';
import { COLORS } from '@/shared/constants/colors';
import { FAMILY_MEMBERS_ROLE } from '@/shared/constants/family/family-role-members';
import { FONT_SIZE } from '@/shared/constants/font-size';
import { PADDINGS } from '@/shared/constants/paddings';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/form-sign-in-and-register';
import { styleModal } from '@/shared/styles/modal';
import { FamilyMember } from '@/shared/types/family-member';
import { Form } from '@/shared/types/form';
import { DropDownRegisterForm } from '@/shared/ui/drop-down/drop-down-register-form';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';



type PersonFormProps = {
    form: Form,
	onAbout: () => void;
    onFormChange: (field: string, value: any) => void
};

export const PersonForm = ({ form, onFormChange, onAbout }: PersonFormProps) => {

	const [memberFamily, setMemberFamily] = useState<FamilyMember>({
		loginPerson: '',
		name: '',
		surname: '',
		patronymic: '',
		fullName: '',
		role: '',
		positionInFamily: ''
	})

	const handleMemberFamilyChange = (field: string, value: string) => {
		setMemberFamily((prev) => ({...prev, [field]: value}))
	}
	onFormChange("familyMembers", memberFamily)
	return (
		<Modal
			transparent={true}
			animationType='fade'>
			<View style={styleModal.modalOverlay}>
				<View style={styleModal.modalContent}>
					<VerLayout styles={styleForm.section}>
						<Typography
							variant='h3'
							style={styles.label}>
							Ваш логин
						</Typography>
						<Input
							value={memberFamily.loginPerson}
							onChangeText={(text) => handleMemberFamilyChange('loginPerson', text)}
							placeholder='Email'
							style={styleForm.input}
						/>
					</VerLayout>
					<VerLayout styles={styleForm.section}>
						<Typography
							variant='h3'
							style={styles.label}>
							Имя
						</Typography>
						<Input
							value={form.familyMembers.name}
							onChangeText={(text) => handleMemberFamilyChange('name', text)}
							placeholder='Имя'
							style={styleForm.input}
						/>
					</VerLayout>
					<VerLayout styles={styleForm.section}>
						<Typography
							variant='h3'
							style={styles.label}>
							Фамилия
						</Typography>
						<Input
							value={memberFamily.surname}
							onChangeText={(text) => handleMemberFamilyChange('surname', text)}
							placeholder='Фамилия'
							style={styleForm.input}
						/>
					</VerLayout>
					<VerLayout styles={styleForm.section}>
						<Typography
							variant='h3'
							style={styles.label}>
							Отчество
						</Typography>
						<Input
							value={memberFamily.patronymic}
							onChangeText={(text) => handleMemberFamilyChange('patronymic', text)}
							placeholder='Отчество'
							style={styleForm.input}
						/>
					</VerLayout>

					<VerLayout styles={styleForm.section}>
						<Typography
							variant='h3'
							style={styles.label}>
							Кто Вы?
						</Typography>
						<DropDownRegisterForm
                            form={form}
							title='Положение в семье'
							items={FAMILY_MEMBERS_ROLE}
							onFormChange={handleMemberFamilyChange}
						/>
					</VerLayout>

					<TouchableOpacity
						style={styles.btnPrimary}
						onPress={onAbout}>
						<Typography style={styles.btnPrimaryText}>Заполнить</Typography>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: PADDINGS.px16,
		paddingBottom: PADDINGS.px16,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.secondary,
	},
	headerTitle: {
		fontWeight: '600',
		color: COLORS.black,
	},
	closeButton: {
		padding: PADDINGS.px10,
	},
	closeButtonText: {
		color: COLORS.secondary,
	},
	label: {
		marginBottom: PADDINGS.px10,
		color: COLORS.black,
		fontSize: FONT_SIZE.primary,
		fontWeight: '500',
	},
	btnPrimary: {
		backgroundColor: COLORS.primary,
		borderRadius: BORDER_RADII.primary,
		paddingVertical: PADDINGS.px16,
		alignItems: 'center',
		marginTop: PADDINGS.px16,
	},
	btnPrimaryText: {
		color: COLORS.white,
		fontSize: FONT_SIZE.primary,
		fontWeight: '600',
	},
});
