import { BORDER_RADII } from '@/shared/constants/borderRadii';
import { COLORS } from '@/shared/constants/colors';
import { GAPS } from '@/shared/constants/gaps';
import { PADDINGS } from '@/shared/constants/paddings';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { validateForm, validateLogin, validatePassword } from './lib/validate';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';

export const RegisterForm = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const [form, setForm] = useState({
		login: login,
		password: password
	})


	const handleLoginChange = (login: string) => {
		setLogin(login)
	}

	const handlePasswordChange = (password: string) => {
		setPassword(password)
	}

	const handleSignIn = () => {
		const {isValid, message} = validateForm(login, password)
		if(!isValid){
			setMessage(message)
			return
		}
		setMessage("")
	};

	const handleRegister = () => {
		const { isValid, message } = validateForm(login, password)
		if(!isValid){
			setMessage(message)
			return
		}
		setMessage("")
	};

	return (
		<VerLayout styles={styleForm.form}>
			<VerLayout styles={styleForm.sectionLogin}>
				<Typography
					variant='h3'
					style={styleForm.label}>
					Логин Вашей семьи
				</Typography>
				<Input value={login} onChangeText={handleLoginChange} placeholder="Email" style={styleForm.input} />
			</VerLayout>
			<VerLayout styles={styleForm.sectionPassword}>
				<Typography
					variant='h3'
					style={styleForm.label}>
					Пароль Вашей семьи
				</Typography>
				<Input value={password} onChangeText={handlePasswordChange} placeholder='Пароль' isPassword={true} style={styleForm.input} />
			</VerLayout>

			<HorLayout>
				{message !== '' && <Typography>{message}</Typography>}
			</HorLayout>

			<VerLayout styles={styleForm.submitSection}>
				<Typography
					variant='h3'
					style={styleForm.label}>
					Выберите действие
				</Typography>
				<VerLayout styles={styleForm.btns}>
					<Button
						style={styleForm.btnSignIn}
						textVariant='h3'
						textStyle={styleForm.label}
						text='Присоединиться'
						onPress={handleSignIn}
					/>
					<Button
						style={styleForm.btnRegister}
						textVariant='h3'
						textStyle={styleForm.label}
						text='Зарегистрировать'
						onPress={handleRegister}
					/>
				</VerLayout>
			</VerLayout>
		</VerLayout>
	);
};

const btnCommon = {
	color: COLORS.primaryColorText,
	padding: PADDINGS.primaryButton,
	borderRadius: BORDER_RADII.primaryButton,
	borderStyle: 'solid',
	borderWidth: 1,
	borderColor: COLORS.black
} as const

const styleForm = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: PADDINGS.px32,
    },
    sectionLogin: {
        width: '100%',
        marginBottom: GAPS.px20,
    },
    sectionPassword: {
        width: '100%',
        marginBottom: GAPS.px32,
    },
    input: {
        backgroundColor: COLORS.primaryColorBackgroundInput,
        borderRadius: BORDER_RADII.primaryInput,
        height: 52,
        width: '100%',
        paddingHorizontal: PADDINGS.px16,
        fontSize: 16,
        marginTop: GAPS.px8,
    },
    submitSection: {
        width: '100%',
        alignItems: 'center',
        marginTop: GAPS.px16,
    },
    btns: {
        gap: GAPS.px12,
        width: '100%',
        marginTop: GAPS.px16,
    },
    btnSignIn: {
        ...btnCommon,
        backgroundColor: COLORS.secondary,
        width: '100%',
    },
    btnRegister: {
        ...btnCommon,
        backgroundColor: COLORS.primary,
        width: '100%',
    },
    label: {
        color: COLORS.primaryColorText,
        fontSize: 14,
        fontWeight: '500',
    },
    actionLabel: {
        color: COLORS.primaryColorText,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: GAPS.px8,
    },
    buttonText: {
        color: COLORS.primaryColorText,
        fontSize: 16,
        fontWeight: '600',
    },
});
