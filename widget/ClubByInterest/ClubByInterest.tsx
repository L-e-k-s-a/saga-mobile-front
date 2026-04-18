import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';

export const ClubByInterestWidget = () => {
	const handleAddThing = () => {};

	return (
		<BackgroundContainer>
			<AlignContainer>
				<ButtonAdd action={handleAddThing} />
			</AlignContainer>
		</BackgroundContainer>
	);
};
