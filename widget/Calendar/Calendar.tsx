import { CalendarSaga } from '@/features/calendar/ui/calendar/calendar';
import { CreateModalCalendar } from '@/features/calendar/ui/create-modal-calendar/create-modal-calendar';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { Typography } from '@/shared/ui/typography/typography';
import { useState } from 'react';

export const CalendarWidget = () => {

	const [isVisibleModal, setIsVisibleModal] = useState(false)

	return (
		<BackgroundContainer>
			<AlignContainer>
				<CreateModalCalendar isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}/>
				<CalendarSaga setModalVisible={setIsVisibleModal}/>
			</AlignContainer>
		</BackgroundContainer>
	);
};
