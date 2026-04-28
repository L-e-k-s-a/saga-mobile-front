import { CreateProductModal } from '@/features/products/create-product-modal/create-product-modal';
import { ProductGroup } from '@/features/products/product-group/product-group';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { useState } from 'react';

export const ProductsWidget = () => {
	const [isVisible, setIsVisible] = useState(false)
	const handleAddProductOrGoods = () => {
		setIsVisible(true)
	};

	return (
		<BackgroundContainer>
			<AlignContainer>
				<ProductGroup/>
				<CreateProductModal isVisible={isVisible} setIsVisible={setIsVisible}/>
				<ButtonAdd action={handleAddProductOrGoods} />
			</AlignContainer>
		</BackgroundContainer>
	);
};
