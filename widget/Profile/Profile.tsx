import { MenuProfile } from '@/features/profile/menu/menu-profile';
import { ProfileView } from '@/features/profile/profile-card/profile-card';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { Typography } from '@/shared/ui/typography/typography';

export const ProfileWidget = () => {
	return (
		<BackgroundContainer>
			<AlignContainer>
				<ProfileView />
				<MenuProfile />
			</AlignContainer>
		</BackgroundContainer>
	);
};

