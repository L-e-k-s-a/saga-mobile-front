import { Family } from '@/entities/family/type/family';
import { useMe } from '@/shared/store/me/useMe';
import { useQuery } from '@tanstack/react-query';
import { getFamiliesUser } from '../lib/getFamiliesUser';

export const useFamiliesUsers = () => {
	const user = useMe();
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['familyUsers', user.uid],
		queryFn: async () => {
			if (!user.uid) {
				return;
			}

			const result: Family[] = await getFamiliesUser(user.uid);
			return result;
		},
		staleTime: 0,
		refetchOnMount: true,
	});

	return { data, isLoading, error, refetch };
};
