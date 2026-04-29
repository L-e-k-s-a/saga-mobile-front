import { getImportanceColor } from '@/features/tasks/libs/get-importance-color';
import { COLORS } from '@/shared/constants/colors';
import { useCalendarStore } from '@/shared/store/calendar/calendar-store';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { DateData } from 'react-native-calendars';

type DayProps = {
	date?: DateData;
	marking?: {
		marked?: boolean;
		events?: any[];
		dots?: Array<{ color: string }>;
	};
	state?: 'selected' | 'disabled' | 'today' | 'inactive' | '';
	setIsVisibleModal?: (isVisible: boolean) => void;
};

export const Day = ({
	date,
	marking,
	state,
	setIsVisibleModal,
}: DayProps) => {
	const { setSelectedDateForCreateEvent, setSelectedDateForShow, selectedDateForShow } = useCalendarStore();

	const handleOnPress = () => {
		if (date) {
			setSelectedDateForCreateEvent(date.dateString);
			setSelectedDateForShow(date.dateString)
		}
	};

	const handleLongPress = () => {
		if (date) {
			setSelectedDateForCreateEvent(date.dateString);
		}
		if (setIsVisibleModal) {
			setIsVisibleModal(true);
		}
	};

	const events = marking?.events || [];
	const dots = marking?.dots || [];

	const eventDots =
		events.length > 0
			? events.map((event) => ({
					color: getImportanceColor(event.typeEvent, event.importance),
				}))
			: dots;

	const visibleDots = eventDots.slice(0, 3);
	const remainingCount = eventDots.length - 3;
	const isSelected = date?.dateString === selectedDateForShow

	return (
		<TouchableOpacity
			onPress={handleOnPress}
			onLongPress={handleLongPress}
			delayLongPress={500}>
			<View
				style={[
					styleDay.base,
					state === 'today' && styleDay.today,
					isSelected && styleDay.selected,
				]}>
				<Typography textColor='secondary'>{date?.day}</Typography>

				{eventDots.length > 0 && (
					<View style={styleDay.dotsContainer}>
						{visibleDots.map((dot, index) => (
							<View
								key={index}
								style={[styleDay.dot, { backgroundColor: dot.color }]}
							/>
						))}
						{remainingCount > 0 && (
							<Typography
								textColor='secondary'
								style={styleDay.remainingCount}>
								+{remainingCount}
							</Typography>
						)}
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

const styleDay = StyleSheet.create({
	base: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		position: 'relative',
	},
	today: {
		backgroundColor: COLORS.teal,
	},
	selected: {
		backgroundColor: COLORS.turquoise,
	},
	dotsContainer: {
		position: 'absolute',
		bottom: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 2,
	},
	dot: {
		width: 4,
		height: 4,
		borderRadius: 2,
	},
	remainingCount: {
		marginLeft: 2,
		fontSize: 8,
	},
});
