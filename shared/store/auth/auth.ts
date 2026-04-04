import { create } from 'zustand'


type AuthStore = {
    isAuth: boolean
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
    isAuth: false,

    setIsAuth: (val: boolean) => set({isAuth: val}),
    login: () => set({isAuth: true})
}))