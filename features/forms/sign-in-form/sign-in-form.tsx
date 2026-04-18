import { auth } from '@/firebase/firebase';
import { COLORS } from '@/shared/constants/colors';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { RoutesForAuth } from '@/shared/routes/routes';
import { useAuthStore } from '@/shared/store';
import { styleForm } from '@/shared/styles/forms';
import { Button } from '@/shared/ui/buttons/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/Typography/Typography';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export const SignInForm = () => {
	const { login } = useAuthStore();
	const [validFormMessage, setValidFormMessage] = useState('');
	const [signInForm, setSignInForm] = useState({
		login: '',
		password: '',
	});

	const handleChangeSignInForm = (field: string, value: string) => {
		setSignInForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSignIn = async () => {
		try {
			const candidate = await signInWithEmailAndPassword(
				auth,
				signInForm.login,
				signInForm.password,
			);
			login();
		} catch (err) {
			setValidFormMessage(String(err));
		}
	};

	const handleRegister = () => {
		router.push(RoutesForAuth.REGISTER);
	};

	return (
		<VerLayout styles={styleAuthForm.container}>
			<Typography
				variant='h3'
				style={styleForm.label}>
				Выберите действие
			</Typography>
			<VerLayout styles={styleForm.btns}>
				<Input
					placeholder='Email'
					value={signInForm.login}
					onChangeText={(text) => handleChangeSignInForm('login', text)}
					style={styleForm.input}
				/>
				<Input
					placeholder='Пароль'
					value={signInForm.password}
					onChangeText={(text) => handleChangeSignInForm('password', text)}
					style={styleForm.input}
					isPassword={true}
				/>
				{validFormMessage && (
					<Typography style={{ color: COLORS.white }}>
						{validFormMessage}
					</Typography>
				)}
				<Button
					style={styleForm.btnSecondary}
					textVariant='h3'
					textStyle={styleForm.label}
					text='Войти'
					onPress={handleSignIn}
				/>
				<Button
					style={styleForm.btnPrimary}
					textVariant='h3'
					textStyle={styleForm.label}
					text='Зарегистрироваться'
					onPress={handleRegister}
				/>
			</VerLayout>
		</VerLayout>
	);
};

const styleAuthForm = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
