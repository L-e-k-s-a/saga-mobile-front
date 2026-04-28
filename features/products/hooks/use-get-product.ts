import { db } from '@/firebase/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useGetProducts = (activeFamilyUid: string) => {
	const [products, setProducts] = useState<any[]>();
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
			collection(db, 'products'),
			where('familyId', '==', activeFamilyUid),
		);

		const unsubscribe = onSnapshot(
			queryProduct,
			(snapshot) => {
				const productsData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setProducts(productsData);
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
		console.log('Data products is real-time, no need to refetch');
	};

	return { products, isLoading, error, refetch };
};
