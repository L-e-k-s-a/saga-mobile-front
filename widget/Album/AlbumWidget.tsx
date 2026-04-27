import { Album } from '@/features/album/album';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { Typography } from '@/shared/ui/typography/typography';

export const AlbumWidget = () => {

	return (
		<BackgroundContainer>
			<AlignContainer>
				<Album />
				
			</AlignContainer>
		</BackgroundContainer>
	);
};
