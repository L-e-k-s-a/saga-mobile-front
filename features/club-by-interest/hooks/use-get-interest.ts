import { useQuery } from '@tanstack/react-query';
import { getInterests } from '../lib/get-interests';

export const useGetInterest = (activeFamilyUid: string) => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['clubsInterested', activeFamilyUid],
		queryFn: async () => {
			if (!activeFamilyUid) {
				return;
			}
			const interests = await getInterests(activeFamilyUid);
			return interests;
		},
		enabled: !!activeFamilyUid,
		staleTime: 0,
		refetchOnMount: true,
	});

    return {
        data, isLoading, error, refetch
    }
};
