import { User } from '@/entities/user/type/user';
import { create } from 'zustand';

type UserStore = {
	uid: string;
	email: string;
	name: string;
	surname: string;
	patronymic: string;
	fullName: string;
	activeFamily: string;
	countFamily: number;
	loading: boolean;

	setUid: (uid: string) => void;
	setEmail: (email: string) => void;
	setName: (name: string) => void;
	setSurname: (surname: string) => void;
	setPatronymic: (patronymic: string) => void;
	setFullName: (fullName: string) => void;
	setActiveFamily: (activeFamily: string) => void;
	setCountFamily: (count: number) => void;
	setLoadingUser: (load: boolean) => void;
	setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
	uid: '',
	email: '',
	name: '',
	surname: '',
	patronymic: '',
	fullName: '',
	activeFamily: '',
	countFamily: 0,
	loading: false,

	setUid: (newUid: string) => set({ uid: newUid }),
	setEmail: (newEmail: string) => set({ email: newEmail }),
	setName: (newName: string) => set({ name: newName }),
	setSurname: (newSurname: string) => set({ name: newSurname }),
	setPatronymic: (newPatronymic: string) => set({ name: newPatronymic }),
	setFullName: (newFullName: string) => set({ fullName: newFullName }),
	setActiveFamily: (newActivityFamily: string) =>
	set({ activeFamily: newActivityFamily }),
	setCountFamily: (newCount: number) => set({ countFamily: newCount }),
	setLoadingUser: (load: boolean) => set({loading: load}),
	setUser: (newUser: User) => set({ ...newUser }),
}));
