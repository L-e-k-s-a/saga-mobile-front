import { AlignContainer } from "@/shared/layouts/AlignContainer/AlignContainer";
import { BackgroundContainer } from "@/shared/layouts/BackgroundContainer/BackgroundContainer";
import { ButtonAdd } from "@/shared/ui/button-add/button-add";
import { Typography } from "@/shared/ui/Typography/Typography";

export const ProductsWidget = () => {
	
	const handleAddProductOrGoods = () => {

	}
	
	return (
		<BackgroundContainer>
			<AlignContainer>
				<ButtonAdd action={handleAddProductOrGoods}/>
			</AlignContainer>
		</BackgroundContainer>
	);
};
