import { Chat } from '@/features/chat/chat';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { Typography } from '@/shared/ui/typography/typography';

export const ChatWidget = () => {
	return (
		<BackgroundContainer>
			<AlignContainer>
				<Chat />
			</AlignContainer>
		</BackgroundContainer>
	);
};
