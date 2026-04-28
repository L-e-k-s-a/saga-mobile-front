import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { Pet, PetInfo } from '@/shared/types/pet';
import { Card } from '@/shared/ui/card/card';
import { DinamicScrollView } from '@/shared/ui/dinamic-scroll-view/dinamic-scroll-view';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet } from 'react-native';

type CardPetsProps = {
	pet: Pet;
};

export const CardPet = ({ pet }: CardPetsProps) => {
	return (
		<Card title={pet.namePet} titleColor='secondary'>
			<DinamicScrollView maxHeight={150}>
				{pet.petInfo.map((info: PetInfo) => (
					<HorLayout key={info.description} style={styleCardPet.field}>
						<Typography
							variant='h3'
							textColor='secondary'>
							{info.nameField}:
						</Typography>
						<Typography textColor='secondary'>{info.description}</Typography>
					</HorLayout>
				))}
			</DinamicScrollView>
		</Card>
	);
};

const styleCardPet = StyleSheet.create({
    title: {
        width: '100%',
        textAlign: 'center',
    },
    field:{
        alignItems: 'center',
        gap: 5
    },
    description: {

    }
})