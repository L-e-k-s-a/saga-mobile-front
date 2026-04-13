import { FamilyMember } from "./family-member"

export type FormSingIn = {
    login: string,
    loginPerson: string,
    password: string
}

export type Form = {
    nameFamily: string,
    login: string,
    password: string,
    repeatPassword: string,
    familyMembers: FamilyMember
}