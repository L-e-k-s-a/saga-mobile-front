import { User } from '@/entities/user/type/userType'
import { create } from 'zustand'

type AuthStore = {
    isAuth: boolean,
    user: User | null,
    role: string,
    loading: boolean,  
    login: () => void,
    logout: () => void, 
    setUser: (user: User | null) => void, 
    setRole: (role: string) => void,
    setLoading: (loading: boolean) => void,
    setIsAuth: (val: boolean) => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
    isAuth: false,
    user: null,
    role: '',
    loading: false, 

    setIsAuth: (val: boolean) => set({ isAuth: val }),
    login: () => set({ isAuth: true }),
    logout: () => set({ isAuth: false, user: null, role: '' }), 
    setUser: (user: User | null) => set({ user }),
    setRole: (value: string) => set({ role: value }),
    setLoading: (loading: boolean) => set({ loading })
}))