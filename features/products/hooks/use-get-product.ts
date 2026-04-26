import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../libs/get-products';

export const useGetProducts = (activeFamilyUid: string) => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['products', activeFamilyUid],
		queryFn: async () => {
			if (!activeFamilyUid) {
				return;
			}
			const products = await getProducts(activeFamilyUid);
			return products;
		},
		staleTime: 0,
		refetchOnMount: true,
		enabled: !!activeFamilyUid
	});
    return {
        data, isLoading, error, refetch
    }
};
