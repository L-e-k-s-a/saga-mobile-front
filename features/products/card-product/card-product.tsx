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

type CardProductProps = {
	product: ProductAndOrder
};

export const CardProduct = ({ product }: CardProductProps) => {
	const [isDrop, setIsDrop] = useState(false);
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [confirmedItems, setConfirmedItems] = useState<number[]>([]);

	const select = (index: number) => {
		if (confirmedItems.includes(index)) return;
		
		setSelectedItems(prev => 
			prev.includes(index) 
				? prev.filter(i => i !== index)
				: [...prev, index]
		);
	};

	const handleConfirm = () => {
		setConfirmedItems(prev => [...prev, ...selectedItems]);
		setSelectedItems([]);
	};

	const isSelected = (index: number) => selectedItems.includes(index);
	const isConfirmed = (index: number) => confirmedItems.includes(index);

	const renderCheckboxList = () => (
		<>
			{product.productList.map((productItem: Product, index: number) => (
				<Checkbox 
					key={index}
					label={productItem.productName}
					checked={isSelected(index) || isConfirmed(index) || productItem.isConfirm}
					onPress={() => select(index)}
					disabled={isConfirmed(index) || productItem.isConfirm}
				/>
			))}
			<Button
				text='Есть'
				onPress={handleConfirm}
				fullWidth
				disabled={selectedItems.length === 0}
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