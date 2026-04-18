import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { FormRegister } from '@/shared/types/form';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { PersonForm } from '../person-form/person-form';
import { auth, db } from '@/firebase/firebase';
import { router } from 'expo-router';
import { RoutesForAuth } from '@/shared/routes/routes';
import { doc, setDoc } from 'firebase/firestore';

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

	const handleFormChange = (field: string, value: any) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleAbout = () => {
		setIsVisiblePersonForm(!isVisiblePersonForm);
	};

	const handleClearForm = () => {
		setForm({
			loginPerson: '',
			passwordPerson: '',
			repeatPasswordPerson: '',
			name: '',
			surname: '',
			patronymic: '',
		})
		router.navigate(RoutesForAuth.SIGN_IN)
	}

	const handleRegister = async () => {
		try{
			const candidate = await createUserWithEmailAndPassword(auth, form.loginPerson, form.passwordPerson)
			const user = candidate.user
			await setDoc(doc(db, "users", user.uid), {
				email: form.loginPerson,
				name: form.name,
				surname: form.surname,
				patronymic: form.patronymic,
				fullName: `${form.surname} ${form.name} ${form.patronymic}`,
				createAt: new Date(),
				families: []
			})
			handleClearForm()
		}catch(err){
			console.log(err)
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
					onChangeText={(text) => handleFormChange('repeatPasswordPerson', text)}
					placeholder='Повторить пароль'
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
					text='Зарегистрироваться'
					onPress={handleRegister}
				/>
			</VerLayout>
			{isVisiblePersonForm && (
				<PersonForm
					form={form}
					onFormChange={handleFormChange}
					isVisiblePersonForm={isVisiblePersonForm}
					onAbout={handleAbout}
				/>
			)}
		</VerLayout>
	);
};
