import { useCalendarStore } from '@/shared/store/calendar/calendar-store';
import { useUserStore } from '@/shared/store/user/user-store';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { Calendar } from 'react-native-calendars';
import { useGetEvents } from '../../hooks/use-get-events';
import { getMarked } from '../../lib/get-marked';
import { transformEvents } from '../../lib/transform-events';
import { Day } from '../day/day';
import { Events } from '../events/events';

type CalendarSagaProps = {
	setModalVisible: (isVisible: boolean) => void;
};

export const CalendarSaga = ({ setModalVisible }: CalendarSagaProps) => {
	const { activeFamily } = useUserStore();
	const { selectedDateForShow } = useCalendarStore();
	const { events, isLoading, error } = useGetEvents(activeFamily);

	if (!activeFamily) {
		return (
			<NoData
				title='Похоже Вы не состоите в семье'
				desctiption='Быстрее создайте или вступите в семью!'
			/>
		);
	}

	if (error) {
		return;
	}

	if (isLoading) {
		return <Spinner />;
	}

	const transform = transformEvents(events);
	const marks = getMarked(transform);

	return (
		<>
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
			<Events events={transform[selectedDateForShow]} />
		</>
	);
};
