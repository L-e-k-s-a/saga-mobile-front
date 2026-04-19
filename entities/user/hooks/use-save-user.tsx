import { FirebaseAuthUser, OtherDataUser, User } from '@/entities/user/type/userType';
import { useAuthStore } from '@/shared/store';
import { UserCredential } from 'firebase/auth';
import { getUserFromFirebase } from '../lib/getUser'

export const useSaveUser = () => {
	const { setUser, setLoading } = useAuthStore();

	const saveUser = async (authUser: UserCredential) => {
		const userDataFirebase: FirebaseAuthUser = {
			uid: authUser.user.uid,
			email: authUser.user.email || '',
			name: authUser.user.displayName || '',
		};
	
		const uid: string = userDataFirebase.uid
		const userFromFirebase = await getUserFromFirebase(uid)
		console.log(userFromFirebase)
		const user: User = {
			uid: userDataFirebase.uid,
			email: userDataFirebase.email,
			name: userDataFirebase.name,
			surname: '',
			patronymic: userFromFirebase.pat,
			fullName: '',
			createAt: '',
			activeFamily: '',
		};


		setUser(user);
		setLoading(false)
	}
	// Если нужно получить роль из Firestore
	// const userRole = await getUserRole(authUser.uid);
	// setRole(userRole);

	return { saveUser }
};
