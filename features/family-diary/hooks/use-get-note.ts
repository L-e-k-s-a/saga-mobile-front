
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export const useGetNote = (activeFamilyUid: string) => {
	const [notes, setNotes] = useState<any[]>();
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
				collection(db, 'diaries'),
				where('familyId', '==', activeFamilyUid),
			);
	
			const unsubscribe = onSnapshot(
				queryProduct,
				(snapshot) => {
					const notesData = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					setNotes(notesData);
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
			console.log('Data diaries is real-time, no need to refetch');
		};
	
		return { notes, isLoading, error, refetch };
};

