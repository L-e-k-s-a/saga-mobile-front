import { FirebaseAuthUser, User } from '@/entities/user/type/userType';
import { auth } from '@/firebase/firebase';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { useAuthStore } from '@/shared/store';
import { Spinner } from '@/shared/ui/spiner/spiner';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { CardsOnHomeScreen } from '../CardsOnHomeScreen/CardsOnHomeScreen';
import { Slider } from '../Slider/Slider';
import { StyleSheet, View } from 'react-native';

export const Home = () => {
	const { user, setUser, loading, setLoading, setIsAuth, setRole } =
		useAuthStore();
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			try {
				if (authUser) {
					const userDataFirebase: FirebaseAuthUser = {
						uid: authUser.uid,
						email: authUser.email || '',
						name: authUser.displayName || '',
					};

					const user: User = {
						uid: userDataFirebase.uid,
						email: userDataFirebase.email,
						name: userDataFirebase.name,
						surname: '',
						patronymic: '',
						fullName: '',
						createAt: '',
						families: [],
					}

					setUser(user);
					setIsAuth(true);

					// Если нужно получить роль из Firestore
					// const userRole = await getUserRole(authUser.uid);
					// setRole(userRole);
				} else {
					setUser(null);
					setIsAuth(false);
					setRole('');
				}
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, []);

	if (loading) {
		return <Spinner style={styleHome.spinner}/>;
	}

	if (error) {
		return <View>Ошибка: {error.message}</View>;
	}

	if (!user) {
		return <View>Пожалуйста, войдите в систему</View>;
	}

	return (
		<BackgroundContainer>
			<AlignContainer>
				<Slider />
				<CardsOnHomeScreen />
			</AlignContainer>
		</BackgroundContainer>
	);
};


const styleHome = StyleSheet.create({
	spinner: {
		position: "absolute",
		flex: 1
	}
})