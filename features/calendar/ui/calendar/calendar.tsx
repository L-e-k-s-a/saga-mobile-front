import { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Day } from '../day/day';

type CalendarSagaProps = {
	setModalVisible: (isVisible: boolean) => void
}

export const CalendarSaga = ({setModalVisible}: CalendarSagaProps) => {
      const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
	return (
		<Calendar
			// Отметки на днях с событиями
			markedDates={{
				'2026-04-22': { marked: true, dotColor: 'red' },
				'2026-04-25': { marked: true, dotColor: 'blue' },
				[selectedDate]: { selected: true, selectedColor: '#2196f3' },
			}}
			onDayPress={(day) => {
				setSelectedDate(day.dateString);
			}}
			enableSwipeMonths={true}
			dayComponent={(props) => <Day {...props} setIsVisibleModal={setModalVisible}/>}
			minDate={'2020-01-01'}
			maxDate={'2030-12-31'}
			firstDay={1}
			hideExtraDays={true}
		/>
	);
};
