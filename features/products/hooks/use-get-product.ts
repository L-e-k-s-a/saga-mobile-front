import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../libs/get-products';
import { Product } from '@/shared/types/product';

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
	});
    return {
        data, isLoading, error, refetch
    }
};
