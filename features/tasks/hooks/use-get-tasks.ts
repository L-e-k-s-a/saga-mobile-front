import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../libs/get-tasks';

export const useGetTasks = (activeFamilyUid: string) => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['tasks', activeFamilyUid],
		queryFn: async () => {
			if (!activeFamilyUid) {
				return;
			}
			const tasks = await getTasks(activeFamilyUid);
            console.log(tasks)
			return tasks;
		},
		staleTime: 0,
		refetchOnMount: true,
	});

	return { data, isLoading, error, refetch };
};
