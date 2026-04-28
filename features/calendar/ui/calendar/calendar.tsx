import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Day } from '../day/day';
import { useGetEvents } from '../../hooks/use-get-events';
import { useUserStore } from '@/shared/store/user/user-store';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { transformEvents } from '../../lib/transform-events';
import { getMarked } from '../../lib/get-marked';

type CalendarSagaProps = {
	setModalVisible: (isVisible: boolean) => void;
};

export const CalendarSaga = ({ setModalVisible }: CalendarSagaProps) => {
	const { activeFamily } = useUserStore()
	const { events, isLoading, error } = useGetEvents(activeFamily)
	const today = new Date().toISOString().split('T')[0];

	if(error){
		return 
	}

	if(isLoading){
		return <Spinner />
	}

	const transform = transformEvents(events)
	const marks = getMarked(transform)

	console.log("marks", marks)

	return (
		<Calendar
			markedDates={marks}
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
