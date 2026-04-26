import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { useUserStore } from '@/shared/store/user/user-store';
import { ProductAndOrder, Product } from '@/shared/types/product';
import { Button } from '@/shared/ui/buttons/button/Button';
import { DinamicScrollView } from '@/shared/ui/dinamic-scroll-view/dinamic-scroll-view';
import { Input } from '@/shared/ui/Input/Input';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Typography } from '@/shared/ui/typography/typography';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSaveProduct } from '../hooks/use-save-product';
import { styleForm } from '@/shared/styles/forms';

type CreateProductFormProps = {
	setIsVisible: (isVisible: boolean) => void;
};

export const CreateProductForm = ({ setIsVisible }: CreateProductFormProps) => {
	const { activeFamily } = useUserStore();
	const saveProduct = useSaveProduct();
	const [nameProduct, setNameProduct] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [editItem, setEditItem] = useState({
		isEdit: false,
		value: '',
		index: 0,
	});
	const [form, setForm] = useState<ProductAndOrder>({
		productId: '',
		nameList: '',
		familyId: activeFamily || '',
		productList: [],
	});

	useEffect(() => {
		if (form.productList.length !== 0 && form.nameList !== '') {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form]);

	const handleSaveProducts = () => {
		saveProduct(form);
		setForm({
			productId: '',
			nameList: '',
			familyId: activeFamily || '',
			productList: [],
		});
		setIsVisible(false);
	};

	const handleAddProduct = () => {
		if (nameProduct.trim() === '') {
			return;
		}
		const newProduct: Product = {
			productName: nameProduct,
			isConfirm: false,
		};
		setForm((prev: ProductAndOrder) => ({
			...prev,
			productList: [...prev.productList, newProduct],
		}));
		setNameProduct('');
	};

	const handleDeleteProduct = (deleteItem: number) => {
		setForm((prev: ProductAndOrder) => ({
			...prev,
			productList: prev.productList.filter((_, index) => index !== deleteItem),
		}));
	};

	const handleEditProduct = (numberItem: number) => {
		const product = form.productList[numberItem];
		setEditItem({
			isEdit: true,
			value: product.productName,
			index: numberItem,
		});
	};

	const handleEditApply = (numberItem: number) => {
		const editProductName = editItem.value;
		setForm((prev: ProductAndOrder) => ({
			...prev,
			productList: prev.productList.map((item, index) => 
				index === numberItem 
					? { ...item, productName: editProductName }
					: item
			),
		}));
		setEditItem({
			isEdit: false,
			value: '',
			index: 0,
		});
	};

	return (
		<VerLayout>
			<Input
				style={styleForm.input}
				placeholder='Название списка'
				value={form.nameList}
				onChangeText={(text) => setForm((prev) => ({ ...prev, nameList: text }))}
			/>
			<HorLayout style={styleCreateProductForm.header}>
				<Input
					style={styleCreateProductForm.input}
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
							<HorLayout key={index} style={styleCreateProductForm.item}>
								{editItem.isEdit && editItem.index === index ? (
									<Input
										style={styleCreateProductForm.input}
										value={editItem.value}
										onChangeText={(text) => {
											setEditItem((prev) => ({ ...prev, value: text }));
										}}
									/>
								) : (
									<Typography
										style={styleCreateProductForm.text}
										variant='h3'
										textColor='secondary'>
										{product.productName}
									</Typography>
								)}
								<HorLayout style={styleCreateProductForm.icons}>
									{editItem.isEdit && editItem.index === index ? (
										<TouchableOpacity
											style={styleCreateProductForm.edit}
											onPress={() => handleEditApply(index)}>
											<Ionicons
												name='checkmark'
												size={16}
												color={COLORS.white}
											/>
										</TouchableOpacity>
									) : (
										<TouchableOpacity
											style={styleCreateProductForm.edit}
											onPress={() => handleEditProduct(index)}>
											<Ionicons
												name='pencil'
												size={16}
												color={COLORS.white}
											/>
										</TouchableOpacity>
									)}

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
				onPress={handleSaveProducts}
				disabled={disabled}
				fullWidth
			/>
		</VerLayout>
	);
};

const common = {
	borderRadius: 10,
};

const commonIcon = {
	padding: 15,
};

const styleCreateProductForm = StyleSheet.create({
	header: {
		justifyContent: 'space-between',
		marginVertical: 10
	},
	addProduct: {
		backgroundColor: COLORS.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 5,
		padding: 18,
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
		...commonIcon,
		...common,
	},
	edit: {
		backgroundColor: COLORS.primary,
		...commonIcon,
		...common,
	},
	input: {
		height: '100%',
		width: '70%',
		borderRadius: 10,
		borderWidth: 1,
		paddingLeft: 10,
		marginRight: 10
	},
	text: {
		width: '60%',
		flexWrap: 'wrap',
	},
});