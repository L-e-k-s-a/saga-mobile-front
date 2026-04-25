import { useUserStore } from '@/shared/store/user/user-store';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { CardProduct } from '../card-product/card-product';
import { useGetProducts } from '../hooks/use-get-product';
import { useEffect } from 'react';

type ProductGroupProps = {
	refetchTrigger: boolean
}


export const ProductGroup = ({refetchTrigger}: ProductGroupProps) => {
	const { activeFamily } = useUserStore();


	useEffect(() => {
		refetch()
	}, [refetchTrigger])

	if (!activeFamily) {
		return (
			<NoData
				title='Похоже Вы не состоите в семье'
				desctiption='Быстрее создайте или вступите в семью!'
			/>
		);
	}
	const {
		data: products,
		isLoading,
		error,
		refetch,
	} = useGetProducts(activeFamily);

	if (error) {
		return;
	}

	if (isLoading) {
		return <Spinner />;
	}

	return products && products.length > 0 ? (
		<>
			<FlatList
				data={products}
				renderItem={({ item }) => (
					<TouchableOpacity>
						<CardProduct product={item} />
					</TouchableOpacity>
				)}
				ListFooterComponent={<View style={{ height: 150 }} />}
			/>
		</>
	) : (
		<NoData
			title='Продуктов или товаров нет'
			desctiption='Создайте список!'
		/>
	);
};
