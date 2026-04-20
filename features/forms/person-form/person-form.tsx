import { BORDER_RADII } from '@/shared/constants/borderRadii';
import { COLORS } from '@/shared/constants/colors';
import { FONT_SIZE } from '@/shared/constants/font-size';
import { PADDINGS } from '@/shared/constants/paddings';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { styleModal } from '@/shared/styles/modal';
import { FormRegister } from '@/shared/types/form';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/typography/typography';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

type PersonFormProps = {
	form: FormRegister;
	isVisiblePersonForm: boolean;
	onAbout: () => void;
	onFormChange: (field: string, value: any) => void;
};

export const PersonForm = ({
	form,
	onFormChange,
	isVisiblePersonForm,
	onAbout,
}: PersonFormProps) => {
	return (
		<Modal
			visible={isVisiblePersonForm}
			transparent={true}
			animationType='fade'>
			<View style={styleModal.modalOverlay}>
				<View style={styleModal.modalContent}>
					<VerLayout styles={styleForm.section}>
						<Typography
							variant='h3'
							style={styles.label}>
							Имя
						</Typography>
						<Input
							value={form.name}
							onChangeText={(text) => onFormChange('name', text)}
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
							value={form.surname}
							onChangeText={(text) => onFormChange('surname', text)}
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
							value={form.patronymic}
							onChangeText={(text) => onFormChange('patronymic', text)}
							placeholder='Отчество'
							style={styleForm.input}
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
