import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/form-sign-in-and-register';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useState } from 'react';
import { validateForm, validateLogin } from '../../shared/lib/validate-form';

export const SignInForm = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [loginPerson, setLoginPerson] = useState('')
	const [message, setMessage] = useState('');
	const [form, setForm] = useState({
		login,
		loginPerson,
		password,
	});
	
	const handleLoginChange = (login: string) => {
		setLogin(login);
	};



	const handleLoginPersonChange = (login: string) => {
		setLoginPerson(login)
	}

	const handlePasswordChange = (password: string) => {
		setPassword(password);
	};

		const handleSignIn = () => {
		const { isValid, message } = validateForm(login, password);
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
					value={login}
					onChangeText={handleLoginChange}
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
					value={loginPerson}
					onChangeText={handleLoginPersonChange}
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
					value={password}
					onChangeText={handlePasswordChange}
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
					style={styleForm.btnSignIn}
					textVariant='h3'
					textStyle={styleForm.label}
					text='Вперёд'
					onPress={handleSignIn}
				/>
			</VerLayout>
		</VerLayout>
	);
};
