import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Day } from '../day/day';

type CalendarSagaProps = {
	setModalVisible: (isVisible: boolean) => void;
};

export const CalendarSaga = ({ setModalVisible }: CalendarSagaProps) => {
	const [events, setEvents] = useState({});

	const today = new Date().toISOString().split('T')[0];


	return (
		<Calendar
			enableSwipeMonths={true}
			dayComponent={(props) => (
				<Day
					{...props}
					setIsVisibleModal={setModalVisible}
			/>
			)}
			minDate={'2020-01-01'}
			maxDate={'2030-12-31'}
			firstDay={1}
			hideExtraDays={true}
		/>
	);
};
