import { db } from "@/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetPets = (activeFamilyUid: string) => {
	const [pets, setPets] = useState<any[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!activeFamilyUid) {
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);

		const queryProduct = query(
			collection(db, 'pets'),
			where('familyId', '==', activeFamilyUid),
		);

		const unsubscribe = onSnapshot(
			queryProduct,
			(snapshot) => {
				const petsData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setPets(petsData);
				setIsLoading(false);
			},
			(err) => {
				console.error('Error fetching product:', err);
				setError(err);
				setIsLoading(false);
			},
		);
		return () => unsubscribe();
	}, [activeFamilyUid]);

	const refetch = () => {
		console.log('Data pets is real-time, no need to refetch');
	};

	return { pets, isLoading, error, refetch };
};
