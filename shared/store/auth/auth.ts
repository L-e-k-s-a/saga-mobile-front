import { create } from 'zustand'


type AuthStore = {
    isAuth: boolean,
    user: any,
    role: string,

    login: () => void
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
    isAuth: true,
    user: null,
    role: '',


    setIsAuth: (val: boolean) => set({isAuth: val}),
    login: () => set({isAuth: true}),
    // setUser: (value) => set({user, ...value}),
    // setRole: (value) => set({role: value})
}))