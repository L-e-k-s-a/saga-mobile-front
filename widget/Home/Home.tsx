import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { CardsOnHomeScreen } from '../CardsOnHomeScreen/CardsOnHomeScreen';
import { Slider } from '../Slider/Slider';
import { useState } from 'react';
import { DropDowmFamily } from '@/shared/ui/drop-down-family/drop-down-family';

export const Home = () => {
	return (
		<BackgroundContainer>
			<AlignContainer>
				<Slider />
				<CardsOnHomeScreen />
			</AlignContainer>
		</BackgroundContainer>
	);
};
