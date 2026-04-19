


export type User = {
    uid: string,              
    email: string,
    name: string,
    surname: string,
    patronymic: string,
    fullName: string,
    createAt: string,
    activeFamily: string,
}

export type FirebaseAuthUser = Pick<User, 'uid' | 'email' | 'name'>;

export type OtherDataUser = Omit<User, 'uid' | 'name'>