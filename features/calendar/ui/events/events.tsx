import { getImportanceColor } from '@/features/tasks/libs/get-importance-color';
import { COLORS } from '@/shared/constants/colors';
import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { ImportanceIndicator } from '@/shared/types/importance-indicator';
import { DinamicScrollView } from '@/shared/ui/dinamic-scroll-view/dinamic-scroll-view';
import { NoData } from '@/shared/ui/no-data/no-data';
import { Typography } from '@/shared/ui/typography/typography';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type EventForShow = {
	importance: ImportanceIndicator;
	title: string;
	familyId: string;
	desciption: string;
	typeEvent: 'reminder' | 'tradition';
};

type EventsProps = {
	events: EventForShow[];
};

export const Events = ({ events }: EventsProps) => {

	const reminders: EventForShow[] = [];
	const traditions: EventForShow[] = [];

	events?.forEach((event) => {
		if (event.typeEvent === 'reminder') {
			reminders.push(event);
			return;
		}
		traditions.push(event);
	});

	return events?.length > 0 ? (
		<>
			<Typography style={styleEvents.title} variant='h3'>Напоминания</Typography>
			{reminders.length > 0 ? (
				<DinamicScrollView style={styleEvents.list} maxHeight={200}>
                    {reminders.map((reminder) => (
                        <HorLayout style={styleEvents.item}>
							<View
								style={[
									{
										backgroundColor: getImportanceColor(
											reminder.typeEvent,
											reminder.importance,
										),
									},
									styleEvents.indicator,
								]}
							/>
							<Typography>{reminder.title}</Typography>
						</HorLayout>
                    ))}
                </DinamicScrollView >
			) : (
				<NoData style={styleEvents.noData} title='На этот день напоминаний нет' desctiption='Добавьте напоминание!'/>
			)}
			<Typography style={styleEvents.title} variant='h3'>Традиции</Typography>
			{traditions.length > 0 ? (
                <DinamicScrollView style={styleEvents.list} maxHeight={200}>
                    {traditions.map((tradition) => (
                        <HorLayout style={styleEvents.item}>
							<View
								style={[
									{
										backgroundColor: getImportanceColor(
											tradition.typeEvent,
											tradition.importance,
										),
									},
									styleEvents.indicator,
								]}
							/>
							<Typography>{tradition.title}</Typography>
						</HorLayout>
                    ))}
                </DinamicScrollView>
				
			) : (
                
				<NoData style={styleEvents.noData} title='На этот день традиций нет' desctiption='Добавьте традицию!'/>
			)}
		</>
	) : (
		<NoData title='Ничего нет' desctiption='Добавьте напоминание или традицию!'/>
	);
};

const styleEvents = StyleSheet.create({
	title: {
        marginVertical: 10
    },
	item: {
		gap: 5,
		padding: 10,
		backgroundColor: COLORS.secondary,
		borderRadius: 10,
		alignItems: 'center',
	},
	list: {
		gap: 10,
	},
	indicator: {
		width: 20,
		height: 20,
		borderRadius: 20,
	},
    noData: {
        flex: 0.5,
    }
});
