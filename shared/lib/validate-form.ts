import { Form, FormSingIn } from '../types/form';

export const validateLogin = (
	login: string,
): { isValid: boolean; message: string } => {
	if (login.length === 0) {
		return {
			isValid: false,
			message: 'Логин не должен быть пустым',
		};
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return {
		isValid: emailRegex.test(login),
		message: 'Неправильный логин или пароль',
	};
};

export const validatePassword = (
	password: string,
): { isValid: boolean; message: string } => {
	const hasLettersRegex = /[a-zA-Z]/;
	if (!hasLettersRegex.test(password)) {
		return {
			isValid: false,
			message: 'Пароль должен содержать латинские буквы',
		};
	}
	const hasUpperCaseAndLowerCaseRegex = /(?=.*[a-z])(?=.*[A-Z])/;
	if (!hasUpperCaseAndLowerCaseRegex.test(password)) {
		return {
			isValid: false,
			message: 'Пароль должен содержать маленькую и большую букву',
		};
	}
	const minLengthRegex = /^.{9,}$/;
	if (!minLengthRegex.test(password)) {
		return {
			isValid: false,
			message: 'Пароль должен быть более 8 символов',
		};
	}
	const hasSpecialCharRegex = /[_-]/;
	if (!hasSpecialCharRegex.test(password)) {
		return {
			isValid: false,
			message: 'Пароль должен содержать - или _',
		};
	}
	return {
		isValid: true,
		message: '',
	};
};

const validEmptyField = (form: Form) => {
	Object.keys(form).map((key: string) => form[key as keyof Form] === '');
};

export const validateFormSignIn = (form: FormSingIn) => {
    return {
        isValid: false,
        message: ''
    }
}

export const validateFormRegister = (form: Form) => {
	const { login, loginPerson, password } = form;
	const loginFamily = validateLogin(login);
	const passwordFamily = validatePassword(password);

	if (login === loginPerson) {
		return {
			isValid: false,
			message: 'Извините, Ваша почта не может быть такой же как почта семьи',
		};
	}

	if (!loginFamily.isValid) {
		return loginFamily;
	}

	if (!passwordFamily.isValid) {
		return passwordFamily;
	}

	return {
		isValid: true,
		message: '',
	};
};
