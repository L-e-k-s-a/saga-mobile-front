import { MenuSettings } from '@/features/settings/menu/menu-settings';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { Typography } from '@/shared/ui/typography/typography';

export const SettingsWidget = () => {
	return (
		<BackgroundContainer>
			<AlignContainer>
				<MenuSettings />
			</AlignContainer>
		</BackgroundContainer>
	);
};
