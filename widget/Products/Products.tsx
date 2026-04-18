import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';

export const ProductsWidget = () => {
	const handleAddProductOrGoods = () => {};

	return (
		<BackgroundContainer>
			<AlignContainer>
				<ButtonAdd action={handleAddProductOrGoods} />
			</AlignContainer>
		</BackgroundContainer>
	);
};
