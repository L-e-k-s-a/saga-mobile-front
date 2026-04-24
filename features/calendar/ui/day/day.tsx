import { Typography } from '@/shared/ui/typography/typography';
import { TouchableOpacity, View } from 'react-native';
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
    setIsVisibleModal?: (isVisible: boolean) => void
};

export const Day = ({ date, marking, onDayPress, setIsVisibleModal }: DayProps) => {
	const handleOnPress = () => {};

	const handleLongPress = () => {
        if(setIsVisibleModal){
            setIsVisibleModal(true)
        }
    };

	return (
		<TouchableOpacity
			onPress={handleOnPress}
			onLongPress={handleLongPress}
			delayLongPress={500}>
			<View>{date && <Typography textColor='secondary'>{date.day}</Typography>}</View>
		</TouchableOpacity>
	);
};

