import { FirebaseAuthUser, OtherDataUser, User } from '@/entities/user/type/userType';
import { useAuthStore } from '@/shared/store';
import { UserCredential } from 'firebase/auth';
import { getUserFromFirebase } from '../lib/getUser'
import { useUserStore } from '@/shared/store/user/user-store';

export const useSaveUser = () => {
	const { setLoading } = useAuthStore();
	const { setUser } = useUserStore()

	const saveUser = async (authUser: UserCredential) => {
		const userDataFirebase: FirebaseAuthUser = {
			uid: authUser.user.uid,
			email: authUser.user.email || '',
			name: authUser.user.displayName || '',
		};
	
		const uid: string = userDataFirebase.uid
		const userFromFirebase = await getUserFromFirebase(uid)
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

		console.log("user",user)

		setUser(user);
		setLoading(false)
	}
	// Если нужно получить роль из Firestore
	// const userRole = await getUserRole(authUser.uid);
	// setRole(userRole);

	return { saveUser }
};
