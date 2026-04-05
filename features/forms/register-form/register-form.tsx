import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/form-sign-in-and-register';
import { Form } from '@/shared/types/form';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { validateFormRegister } from '../../../shared/lib/validate-form';
import { PersonForm } from '../person-form/person-form';

export const RegisterForm = () => {
	const [isVisiblePersonForm, setIsVisiblePersonForm] = useState(false);

	const [message, setMessage] = useState('');

	const [form, setForm] = useState<Form>({
		login: '',
		password: '',
		loginPerson: '',
		name: '',
		surname: '',
		patronymic: '',
		fullName: '',
		role: '',
		positionInFamily: '',
	});

	const handleFormChange = (field: string, value: any) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleAbout = () => {
		setIsVisiblePersonForm(!isVisiblePersonForm);
	};

	const handleRegister = () => {
		const { isValid, message } = validateFormRegister(form);
		if (!isValid) {
			setMessage(message);
			return;
		}
		const full_name = form.name + ' ' + form.surname + ' ' + form.patronymic;
		handleFormChange('fullName', full_name);
		setMessage('');
	};

	return (
		<VerLayout styles={styleForm.form}>
			<VerLayout styles={styleForm.section}>
				<Typography
					variant='h3'
					style={styleForm.label}>
					Логин Вашей семьи
				</Typography>
				<Input
					value={form.login}
					onChangeText={(text) => handleFormChange('login', text)}
					placeholder='Email'
					style={styleForm.input}
				/>
			</VerLayout>

			<VerLayout styles={styleForm.section}>
				<Typography
					variant='h3'
					style={styleForm.label}>
					Пароль Вашей семьи
				</Typography>
				<Input
					value={form.password}
					onChangeText={(text) => handleFormChange('password', text)}
					placeholder='Пароль'
					isPassword={true}
					style={styleForm.input}
				/>
			</VerLayout>
			<TouchableOpacity onPress={handleAbout}>
				<Typography style={styleForm.btnSecondary}>Заполнить о себе</Typography>
			</TouchableOpacity>
			<HorLayout>
				{message !== '' && (
					<Typography style={styleForm.errorPrimary}>{message}</Typography>
				)}
			</HorLayout>
			<VerLayout styles={styleForm.submitSection}>
				<Button
					style={styleForm.btnPrimary}
					textVariant='h3'
					textStyle={styleForm.label}
					text='Зарегистрировать'
					onPress={handleRegister}
				/>
			</VerLayout>
			{isVisiblePersonForm && (
				<PersonForm
					form={form}
					onFormChange={handleFormChange}
					onAbout={handleAbout}
				/>
			)}
		</VerLayout>
	);
};
