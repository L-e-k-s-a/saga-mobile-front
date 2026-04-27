import { COLORS } from '@/shared/constants/colors';
import { useCalendarStore } from '@/shared/store/calendar/calendar-store';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { DateData } from 'react-native-calendars';

type MarkingTypes = {
	marked?: boolean;
	dotColor?: string;
	selected?: boolean;
	selectedColor?: string;
};

type DayProps = {
	date?: DateData;
	marking?: MarkingTypes;
	state?: 'selected' | 'disabled' | 'today' | 'inactive' | '';
	theme?: any;
	disabled?: boolean;
	onDayPress?: (date: DateData) => void;

	setIsVisibleModal?: (isVisible: boolean) => void;
};

export const Day = ({
	date,
	marking,
	state,
	onDayPress,
	setIsVisibleModal,
}: DayProps) => {

	const { setSelectedDate } = useCalendarStore()

	const handleOnPress = () => {
		if (date) {
			setSelectedDate(date.dateString)
		}
	};

	const handleLongPress = () => {
		if (setIsVisibleModal) {
			setIsVisibleModal(true);
		}
	};

	return (
		<TouchableOpacity
			onPress={handleOnPress}
			onLongPress={handleLongPress}
			delayLongPress={500}>
			<View
				style={[
					state === 'today' && styleDay.today,
					state === 'selected' && styleDay.selected,
				]}>
				{date && <Typography textColor='secondary'>{date.day}</Typography>}
			</View>
		</TouchableOpacity>
	);
};

const common = {
	borderRadius: 50,
	padding: 3,
};

const styleDay = StyleSheet.create({
	today: {
		backgroundColor: COLORS.turquoise,
		...common,
	},
	selected: {
		backgroundColor: COLORS.turquoise,
	},
});
