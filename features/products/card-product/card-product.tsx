import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { Product } from '@/shared/types/product';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Card } from '@/shared/ui/card/card';
import { Checkbox } from '@/shared/ui/checkbox/checkbox';
import { Typography } from '@/shared/ui/typography/typography';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type CardProductProps = {
	product: Product;
};

export const CardProduct = ({ product }: CardProductProps) => {
	const [isDrop, setIsDrop] = useState(false);

	return (
		<Card>
			{product.productList.length > 3 ? (
				<HorLayout>
					<Typography
						variant='h3'
						textColor='secondary'
						style={styleCardProduct.title}>
						{product.nameList}
					</Typography>
					<HorLayout>
						<TouchableOpacity onPress={() => setIsDrop(!isDrop)}>
							<Ionicons
								name={isDrop ? 'chevron-down' : 'chevron-up'}
								color={COLORS.secondary}
								size={24}
							/>
						</TouchableOpacity>
					</HorLayout>
				</HorLayout>
			) : (
				<>
					<Typography
						variant='h3'
						textColor='secondary'
						style={styleCardProduct.title}>
						{product.nameList}
					</Typography>
					{product.productList.map((product: string) => (
						<Checkbox label={product} />
					))}
					<Button
						text='Есть'
						onPress={() => {}}
						fullWidth
					/>
				</>
			)}
			{isDrop && (
				<>
					{product.productList.map((product) => (
						<Checkbox label={product} />
					))}

					<Button
						text='Есть'
						onPress={() => {}}
						fullWidth
					/>
				</>
			)}
		</Card>
	);
};

const styleCardProduct = StyleSheet.create({
	title: {
		width: '100%',
		textAlign: 'center',
	},
});
