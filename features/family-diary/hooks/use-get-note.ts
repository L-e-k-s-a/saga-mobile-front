import { useQuery } from '@tanstack/react-query';
import { getNotes } from '../lib/get-notes';

export const useGetNote = (activeFamilyUid: string) => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['diaries', activeFamilyUid],
		queryFn: async () => {
			if (!activeFamilyUid) {
				return;
			}
			const notes = await getNotes(activeFamilyUid);
			return notes;
		},
		enabled: !!activeFamilyUid,
		staleTime: 0,
		refetchOnMount: true,
	});

    return {
        data, isLoading, error, refetch
    }
};
