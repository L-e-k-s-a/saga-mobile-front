import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { useAuthStore } from '@/shared/store';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { CardsOnHomeScreen } from '../CardsOnHomeScreen/CardsOnHomeScreen';
import { Slider } from '../Slider/Slider';

export const Home = () => {
	const { loading } = useAuthStore();

	if (loading) {
		return (
			<Spinner
				style={{
					flex: 1,
					opacity: 0.7,
				}}
			/>
		);
	}

	return (
		<BackgroundContainer>
			<AlignContainer>
				<Slider />
				<CardsOnHomeScreen />
			</AlignContainer>
		</BackgroundContainer>
	);
};
