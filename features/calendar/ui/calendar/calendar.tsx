import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Day } from '../day/day';
import { useGetEvents } from '../../hooks/use-get-events';
import { useUserStore } from '@/shared/store/user/user-store';
import { Spinner } from '@/shared/ui/spinner/spinner';

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

	console.log("events", events)
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
