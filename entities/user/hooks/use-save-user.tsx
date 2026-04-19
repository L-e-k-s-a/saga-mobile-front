import { FirebaseAuthUser, User } from '@/entities/user/type/userType';
import { useAuthStore } from '@/shared/store';
import { UserCredential } from 'firebase/auth';

export const useSaveUser = () => {
	const { setUser, setLoading } = useAuthStore();

	const saveUser = (authUser: UserCredential) => {
		const userDataFirebase: FirebaseAuthUser = {
			uid: authUser.user.uid,
			email: authUser.user.email || '',
			name: authUser.user.displayName || '',
		};
	
		const user: User = {
			uid: userDataFirebase.uid,
			email: userDataFirebase.email,
			name: userDataFirebase.name,
			surname: '',
			patronymic: '',
			fullName: '',
			createAt: '',
			activeFamily: '',
			families: [],
		};
		setUser(user);
		setLoading(false)
	}
	// Если нужно получить роль из Firestore
	// const userRole = await getUserRole(authUser.uid);
	// setRole(userRole);

	return { saveUser }
};
