import { db } from '@/firebase/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useGetTasks = (activeFamilyUid: string) => {
	const [tasks, setTasks] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!activeFamilyUid) {
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);

		const queryTasks = query(
			collection(db, 'tasks'),
			where('familyId', '==', activeFamilyUid),
		);

		const unsubscribe = onSnapshot(
			queryTasks,
			(snapshot) => {
				const tasksData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setTasks(tasksData);
				setIsLoading(false);
			},
			(err) => {
				console.error('Error fetching tasks:', err);
				setError(err);
				setIsLoading(false);
			},
		);

		return () => unsubscribe();
	}, [activeFamilyUid]);

	const refetch = () => {
		console.log('Data tasks is real-time, no need to refetch');
	};

	return { tasks, isLoading, error, refetch };
};
