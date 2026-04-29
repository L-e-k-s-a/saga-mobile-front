import { ReminderOrTradition } from '@/shared/types/reminder-or-tradition';

export const transformEvents = (
	events: ReminderOrTradition[],
): Record<string, any[]> => {
	return events.reduce(
		(acc: Record<string, any[]>, event: ReminderOrTradition) => {
			const body = {
				importance: event.importance,
				title: event.title,
				familyId: event.familyId,
				description: event.description,
				typeEvent: event.typeEvent,
			};

			if (event.date in acc) {
				acc[event.date].push(body);
			} else {
				acc[event.date] = [body];
			}

			return acc;
		},
		{},
	);
};
