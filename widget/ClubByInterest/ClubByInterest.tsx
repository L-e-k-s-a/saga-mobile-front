import { ClubInterestGroup } from '@/features/club-by-interest/club-interest-group/club-interest-group';
import { CreateInterestModal } from '@/features/club-by-interest/create-interest-modal/create-interest-modal';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { useState } from 'react';

export const ClubByInterestWidget = () => {
	const [isVisible, setIsVisible] = useState(false)

	const handleAddThing = () => {
		setIsVisible(true)
	};

	return (
		<BackgroundContainer>
			<AlignContainer>
				<ClubInterestGroup />
				<CreateInterestModal isVisible={isVisible} setIsVisible={setIsVisible}/>
				<ButtonAdd action={handleAddThing} />
			</AlignContainer>
		</BackgroundContainer>
	);
};
