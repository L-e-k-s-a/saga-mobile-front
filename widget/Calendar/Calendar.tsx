import { CalendarSaga } from '@/features/calendar/ui/calendar';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { Typography } from '@/shared/ui/typography/typography';

export const CalendarWidget = () => {
	return (
		<BackgroundContainer>
			<AlignContainer>
				<CalendarSaga />
			</AlignContainer>
		</BackgroundContainer>
	);
};
