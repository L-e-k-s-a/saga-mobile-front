import { create } from 'zustand';

type AuthStore = {
	isAuth: boolean;
	loading: boolean;
	login: () => void;
	setIsAuth: (val: boolean) => void;
	setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
	isAuth: false,
	loading: false,

	login: () => set({ isAuth: true }),
	setIsAuth: (val: boolean) => set({ isAuth: val }),
	setLoading: (loading: boolean) => set({ loading }),
}));
