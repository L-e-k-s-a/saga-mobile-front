import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { validateFormRegister, validateFormSignIn } from '@/shared/lib/validate-form';
import { styleForm } from '@/shared/styles/form-sign-in-and-register';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useState } from 'react';

export const SignInForm = () => {
	const [message, setMessage] = useState('');
	const [form, setForm] = useState({
		login: '',
		loginPerson: '',
		password: '',
	});

	const handleChangeForm = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSignIn = () => {
		const { isValid, message } = validateFormSignIn(form);
		if (!isValid) {
			setMessage(message);
			return;
		}
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
					onChangeText={(text) => handleChangeForm('login', text)}
					placeholder='Email'
					style={styleForm.input}
				/>
			</VerLayout>
			<VerLayout styles={styleForm.section}>
				<Typography
					variant='h3'
					style={styleForm.label}>
					Ваш логин
				</Typography>
				<Input
					value={form.loginPerson}
					onChangeText={(text) => handleChangeForm('loginPerson', text)}
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
					onChangeText={(text) => handleChangeForm('password', text)}
					placeholder='Пароль'
					isPassword={true}
					style={styleForm.input}
				/>
			</VerLayout>

			<HorLayout>
				{message !== '' && <Typography>{message}</Typography>}
			</HorLayout>

			<VerLayout styles={styleForm.submitSection}>
				<Button
					style={styleForm.btnSecondary}
					textVariant='h3'
					textStyle={styleForm.label}
					text='Вперёд'
					onPress={handleSignIn}
				/>
			</VerLayout>
		</VerLayout>
	);
};
