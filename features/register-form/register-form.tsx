import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/form-sign-in-and-register';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useState } from 'react';
import { validateForm, validateLogin } from '../../shared/lib/validate-form';
import { DropDownRegisterForm } from '@/shared/ui/drop-down/drop-down-register-form';
import { FAMILY_MEMBERS_ROLE } from '@/shared/constants/family/family-role-members';

export const RegisterForm = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [loginPerson, setLoginPerson] = useState('')
	const [select, setSelect] = useState<{ role: string; ru: string }>({ role: '', ru: '' });

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


	const handleRegister = () => {
		const { isValid, message } = validateForm(login, password);
		if (!isValid) {
			setMessage(message);
			return;
		}
		setMessage('');
	};

	const handleSelect = (item: { role: string; ru: string }) => {
		setSelect(item)
	}
	console.log(select)

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
					Кто Вы?
				</Typography>
				<DropDownRegisterForm title='Ваша роль' items={FAMILY_MEMBERS_ROLE} onSelect={handleSelect}/>
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
					style={styleForm.btnRegister}
					textVariant='h3'
					textStyle={styleForm.label}
					text='Зарегистрировать'
					onPress={handleRegister}
				/>
			</VerLayout>
		</VerLayout>
	);
};
