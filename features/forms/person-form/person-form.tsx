import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { FormRegister } from '@/shared/types/form';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { ModalWindow } from '@/shared/ui/modal/modal-window';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet} from 'react-native';

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
		<ModalWindow visible={isVisiblePersonForm} content={() => (<>
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
			<Button
				variant='secondary'
				text='Заполнить'
				onPress={onAbout}
				fullWidth
			/>
		</>)} />  
	)
}




const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.secondary,
	},
	headerTitle: {
		fontWeight: '600',
		color: COLORS.black,
	},
	closeButton: {
		padding: 10,
	},
	closeButtonText: {
		color: COLORS.secondary,
	},
	label: {
		marginBottom: 10,
		color: COLORS.black,
		fontSize: 16,
		fontWeight: '500',
	},
	btnPrimary: {
		backgroundColor: COLORS.primary,
		borderRadius: 10,
		paddingVertical: 16,
		alignItems: 'center',
		marginTop: 16,
	},
	btnPrimaryText: {
		color: COLORS.white,
		fontSize: 16,
		fontWeight: '600',
	},
});
