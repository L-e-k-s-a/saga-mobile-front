import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { Product, ProductAndOrder } from '@/shared/types/product';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Card } from '@/shared/ui/card/card';
import { Checkbox } from '@/shared/ui/checkbox/checkbox';
import { Typography } from '@/shared/ui/typography/typography';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useUpdateProduct } from '../hooks/use-update-product';


type CardProductProps = {
	product: ProductAndOrder
};

export type SelectedItem = {
	name: string;
	index: number;
};

export const CardProduct = ({ product }: CardProductProps) => {
	const [isDrop, setIsDrop] = useState(false);
	const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
	const [confirmedItems, setConfirmedItems] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { updateProduct } = useUpdateProduct();

	const select = (index: number, name: string) => {
		if (confirmedItems.includes(index)) return;
		
		setSelectedItems(prev => {
			const isAlreadySelected = prev.some(item => item.index === index);
			
			if (isAlreadySelected) {
				return prev.filter(item => item.index !== index);
			} else {
				return [...prev, { name, index }];
			}
		});
	};

	const handleConfirm = async () => {
		if (selectedItems.length === 0) return;
		
		setIsLoading(true);
		try {
			await updateProduct({
				id: product.productId,
				productList: selectedItems
			});
			
			setConfirmedItems(prev => [...prev, ...selectedItems.map(item => item.index)]);
			setSelectedItems([]);
			
			console.log('Товары успешно подтверждены');
		} catch (error) {
			console.error('Ошибка при подтверждении товаров:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const isSelected = (index: number) => selectedItems.some(item => item.index === index);
	const isConfirmed = (index: number) => confirmedItems.includes(index);

	const renderCheckboxList = () => (
		<>
			{product.productList.map((productItem: Product, index: number) => {
				const isItemConfirmed = isConfirmed(index) || productItem.isConfirm;
				
				return (
					<Checkbox 
						key={index}
						label={productItem.productName}
						checked={isSelected(index) || isItemConfirmed}
						onPress={() => select(index, productItem.productName)}
						disabled={isItemConfirmed || isLoading} 
					/>
				);
			})}
			<Button
				text='Есть'
				onPress={handleConfirm}
				fullWidth
				disabled={selectedItems.length === 0 || isLoading}
			/>
		</>
	);

	return (
		<Card>
			<HorLayout>
				<Typography
					variant='h3'
					textColor='secondary'
					style={styleCardProduct.title}>
					{product.nameList}
				</Typography>
				{product.productList.length > 3 && (
					<TouchableOpacity onPress={() => setIsDrop(!isDrop)}>
						<Ionicons
							name={isDrop ? 'chevron-up' : 'chevron-down'}
							color={COLORS.secondary}
							size={24}
						/>
					</TouchableOpacity>
				)}
			</HorLayout>
			
			{product.productList.length <= 3 ? (
				renderCheckboxList()
			) : (
				isDrop && renderCheckboxList()
			)}
		</Card>
	);
};

const styleCardProduct = StyleSheet.create({
	title: {
		flex: 1,
		textAlign: 'center',
	},
});