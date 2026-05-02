import { auth, db } from '@/firebase/firebase';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { RoutesForAuth } from '@/shared/routes/routes';
import { styleForm } from '@/shared/styles/forms';
import { FormRegister } from '@/shared/types/form';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/typography/typography';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AboutForm } from '../about-form/about-form';

export const RegisterForm = () => {
	const [isVisiblePersonForm, setIsVisiblePersonForm] = useState(false);

	const [message, setMessage] = useState('');

	const [form, setForm] = useState<FormRegister>({
		loginPerson: '',
		passwordPerson: '',
		repeatPasswordPerson: '',
		name: '',
		surname: '',
		patronymic: '',
	});

	const disabledRegister = Object.values(form).some((value) => (value = ''));

	const handleFormChange = (field: string, value: any) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleClearForm = () => {
		setForm({
			loginPerson: '',
			passwordPerson: '',
			repeatPasswordPerson: '',
			name: '',
			surname: '',
			patronymic: '',
		});
		router.navigate(RoutesForAuth.SIGN_IN);
	};

	const handleRegister = async () => {
		try {
			const candidate = await createUserWithEmailAndPassword(
				auth,
				form.loginPerson,
				form.passwordPerson,
			);
			const user = candidate.user;
			await setDoc(doc(db, 'users', user.uid), {
				email: form.loginPerson,
				name: form.name,
				surname: form.surname,
				patronymic: form.patronymic,
				fullName: `${form.surname} ${form.name} ${form.patronymic}`,
				createAt: new Date(),
				activeFamily: '',
			});
			handleClearForm();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<VerLayout styles={styleForm.form}>
			<VerLayout styles={styleForm.section}>
				<Input
					value={form.loginPerson}
					onChangeText={(text) => handleFormChange('loginPerson', text)}
					placeholder='Логин'
					style={styleForm.input}
				/>
				<Input
					value={form.passwordPerson}
					onChangeText={(text) => handleFormChange('passwordPerson', text)}
					placeholder='Пароль'
					isPassword={true}
					style={styleForm.input}
				/>
				<Input
					value={form.repeatPasswordPerson}
					onChangeText={(text) =>
						handleFormChange('repeatPasswordPerson', text)
					}
					placeholder='Повторить пароль'
					isPassword={true}
					style={styleForm.input}
				/>
			</VerLayout>
			<Button
				text='Заполнить о себе'
				onPress={() => setIsVisiblePersonForm(true)}
				style={styleRegisterForm.buttonAbout}
			/>

			<HorLayout>
				{message !== '' && (
					<Typography style={styleForm.errorPrimary}>{message}</Typography>
				)}
			</HorLayout>
			<VerLayout styles={styleForm.submitSection}>
				<Button
					variant='secondary'
					text='Зарегистрироваться'
					onPress={handleRegister}
					disabled={disabledRegister}
					fullWidth
				/>
			</VerLayout>
			<AboutForm
				form={form}
				onFormChange={handleFormChange}
				isVisibleAboutForm={isVisiblePersonForm}
				setIsVisibleAboutForm={setIsVisiblePersonForm}
			/>
		</VerLayout>
	);
};

const styleRegisterForm = StyleSheet.create({
	buttonAbout: {
		width: '70%',
	},
});
