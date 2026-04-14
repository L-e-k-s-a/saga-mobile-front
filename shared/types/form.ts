import { FamilyMember } from './family-member';

export type FormSingIn = {
	login: string;
	loginPerson: string;
	password: string;
};

export type FormRegister = {
    loginPerson: string,
    passwordPerson: string,
    repeatPasswordPerson: string,
    name: string,
    surname: string,
    patronymic: string,
    fullName: string,
    role: string,
    positionInFamily: string,
};
