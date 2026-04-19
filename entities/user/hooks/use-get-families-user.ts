import { auth } from '@/firebase/firebase';
import { FamilyUserType } from '@/shared/types/families-user-type';
import { useQuery } from '@tanstack/react-query';
import { getFamiliesUser } from '../lib/getFamiliesUser';

export const useFamiliesUsers = () => {
	const uid = auth.currentUser?.uid;
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['familyUsers', uid],
		queryFn: async () => {
			if (!uid) {
				return;
			}

			const result: FamilyUserType[] = await getFamiliesUser(uid);
			return result;
		},
		staleTime: 0,
        refetchOnMount: true, 
	});

	return { data, isLoading, error, refetch };
};
