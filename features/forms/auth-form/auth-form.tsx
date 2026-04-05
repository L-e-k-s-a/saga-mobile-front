import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { RoutesForAuth } from '@/shared/routes/routes';
import { styleForm } from '@/shared/styles/form-sign-in-and-register';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

export const AuthForm = () => {
	const handleSignIn = () => {
		router.push(RoutesForAuth.SIGN_IN);
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
				<Button
					style={styleForm.btnSecondary}
					textVariant='h3'
					textStyle={styleForm.label}
					text='Присоединиться'
					onPress={handleSignIn}
				/>
				<Button
					style={styleForm.btnPrimary}
					textVariant='h3'
					textStyle={styleForm.label}
					text='Зарегистрировать'
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
