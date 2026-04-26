import {
    FirebaseAuthUser,
    User
} from '@/entities/user/type/user';
import { useAuthStore } from '@/shared/store';
import { useUserStore } from '@/shared/store/user/user-store';
import { UserCredential } from 'firebase/auth';
import { getUserFromFirebase } from '../lib/getUser';

export const useSaveUser = () => {
	const { setUser } = useUserStore();

	const saveUser = async (authUser: UserCredential) => {
		const userDataFirebase: FirebaseAuthUser = {
			uid: authUser.user.uid,
			email: authUser.user.email || '',
			name: authUser.user.displayName || '',
		};

		const uid: string = userDataFirebase.uid;
		const userFromFirebase = await getUserFromFirebase(uid);
		const user: User = {
			uid: userDataFirebase.uid,
			email: userDataFirebase.email,
			name: userFromFirebase.name,
			surname: userFromFirebase.surname,
			patronymic: userFromFirebase.patronymic,
			fullName: userFromFirebase.fullName,
			createAt: userFromFirebase.createAt,
			activeFamily: userFromFirebase.activeFamily || '',
		};
		setUser(user);
	};
	return { saveUser };
};
