import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { Product } from '@/shared/types/product';
import { Button } from '@/shared/ui/buttons/button/Button';
import { DinamicScrollView } from '@/shared/ui/dinamic-scroll-view/dinamic-scroll-view';
import { Input } from '@/shared/ui/Input/Input';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Typography } from '@/shared/ui/typography/typography';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type CreateProductFormProps = {
	setIsVisible: (isVisible: boolean) => void;
};

export const CreateProductForm = ({ setIsVisible }: CreateProductFormProps) => {
	const [nameProduct, setNameProduct] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [form, setForm] = useState<Product>({
		productList: [],
	});

	useEffect(() => {
		if (form.productList.length !== 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form]);

	const handleAddProduct = () => {
		if (nameProduct === '') {
			return;
		}
		setForm((prev: Product) => ({
			...prev,
			productList: [...prev.productList, nameProduct],
		}));
		setNameProduct('');
	};

	const handleDeleteProduct = (deleteItem: number) => {
		setForm((prev: Product) => ({
			...prev,
			productList: prev.productList.filter((_, index) => index !== deleteItem),
		}));
	};

	return (
		<VerLayout>
			<HorLayout style={styleForm.section}>
				<Input
					style={styleForm.input}
					placeholder='Продукт или товар'
					value={nameProduct}
					onChangeText={(text) => setNameProduct(text)}
				/>
				<TouchableOpacity
					style={styleCreateProductForm.addProduct}
					onPress={handleAddProduct}>
					<Ionicons
						name='arrow-up'
						color={COLORS.white}
						size={24}
					/>
				</TouchableOpacity>
			</HorLayout>
			<VerLayout>
				{form.productList.length > 0 ? (
					<DinamicScrollView
						maxHeight={250}
						style={styleCreateProductForm.containerItems}>
						{form.productList.map((product, index) => (
							<HorLayout style={styleCreateProductForm.item}>
								<Typography
									variant='h3'
									textColor='secondary'>
									{product}
								</Typography>
								<HorLayout style={styleCreateProductForm.icons}>
									<TouchableOpacity style={styleCreateProductForm.edit}>
										<Ionicons
											name='pencil'
											size={16}
											color={COLORS.white}
										/>
									</TouchableOpacity>
									<TouchableOpacity
										style={styleCreateProductForm.trash}
										onPress={() => handleDeleteProduct(index)}>
										<Ionicons
											name='trash'
											size={16}
											color={COLORS.white}
										/>
									</TouchableOpacity>
								</HorLayout>
							</HorLayout>
						))}
					</DinamicScrollView>
				) : (
					<NoData
						title='Ничего нет'
						desctiption='Добавьте продукт или товар'
						colorText='secondary'
					/>
				)}
			</VerLayout>
			<Button
				text='Сохранить'
				onPress={() => {}}
				disabled={disabled}
				fullWidth
			/>
		</VerLayout>
	);
};

const common = {
	borderRadius: 10,
};

const styleCreateProductForm = StyleSheet.create({
	addProduct: {
		backgroundColor: COLORS.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 5,
		marginTop: 8,
		padding: 14,
		...common,
	},
	containerItems: {
		gap: 5,
		paddingBottom: 10,
	},
	item: {
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	icons: {
		gap: 3,
	},
	trash: {
		backgroundColor: COLORS.red,
		padding: 10,
		...common,
	},
	edit: {
		backgroundColor: COLORS.primary,
		padding: 10,
		...common,
	},
});
