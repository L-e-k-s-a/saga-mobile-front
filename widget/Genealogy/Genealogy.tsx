import { Genealogy } from '@/features/genealogy/genealogy';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { Typography } from '@/shared/ui/typography/typography';

export const GenealogyWidget = () => {
	return (
		<BackgroundContainer>
			<AlignContainer>
				<Genealogy />
			</AlignContainer>
		</BackgroundContainer>
	);
};
