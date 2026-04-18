import { auth } from '@/firebase/firebase';
import { FamilyUserType } from '@/shared/types/families-user-type';
import { useEffect, useState } from 'react';
import { getFamiliesUser } from '../lib/getFamiliesUser';

export const useFamiliesUsers = () => {
	const [families, setFamilies] = useState<FamilyUserType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const uid = auth.currentUser?.uid;

	useEffect(() => {
		if (!uid) {
			setLoading(false);
			return;
		}
		const fetchFamilies = async () => {
			try {
				setLoading(true);
				const result: FamilyUserType[] = await getFamiliesUser(uid);
				setFamilies(result);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchFamilies();
	}, [uid]);

	return { families, loading, error };
};
