import { auth } from '@/firebase/firebase';
import { signOut } from 'firebase/auth';
import { create } from 'zustand';

type AuthStore = {
	isAuth: boolean;
	loading: boolean;
	login: () => void;
	logout: () => Promise<void>;
	setIsAuth: (val: boolean) => void;
	setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
	isAuth: false,
	loading: false,

	login: () => set({ isAuth: true }),
	logout: async () => {
		try {
			await signOut(auth);
			set({ isAuth: false, loading: false });
		} catch (error) {
			console.error('Ошибка при выходе:', error);
			throw error;
		}
	},
	setIsAuth: (val: boolean) => set({ isAuth: val }),
	setLoading: (loading: boolean) => set({ loading }),
}));
