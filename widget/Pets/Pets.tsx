import { CreatePetModal } from '@/features/pet/create-pet-modal/create-pet-modal';
import { PetsGroup } from '@/features/pet/pets-group/pets-group';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { useUserStore } from '@/shared/store/user/user-store';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { useState } from 'react';

export const PetsWidget = () => {
	const { activeFamily } = useUserStore()
	const [isVisible, setIsVisible] = useState(false)
	const handleAddPet = () => {
		setIsVisible(true)
	};

	return (
		<BackgroundContainer>
			<AlignContainer>
				<PetsGroup />
				<CreatePetModal isVisible={isVisible} setIsVisible={setIsVisible}/>
				{ activeFamily && <ButtonAdd action={handleAddPet} />}
			</AlignContainer>
		</BackgroundContainer>
	);
};
