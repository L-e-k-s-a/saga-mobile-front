import { db } from '@/firebase/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useGetInterest = (activeFamilyUid: string) => {
	const [interests, setInterests] = useState<any[]>();
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
			collection(db, 'clubsInterested'),
			where('familyId', '==', activeFamilyUid),
		);

		const unsubscribe = onSnapshot(
			queryProduct,
			(snapshot) => {
				const interestsData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setInterests(interestsData);
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
		console.log('Data interests is real-time, no need to refetch');
	};

	return { interests, isLoading, error, refetch };
};
