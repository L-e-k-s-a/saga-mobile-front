import { create } from 'zustand';

type CalendarStore = {
	today: string;
	selectedDateForCreateEvent: string;
	selectedDateForShow: string;

	setSelectedDateForCreateEvent: (date: string) => void;
	setSelectedDateForShow: (date: string) => void;
	initDates: () => void
};

export const useCalendarStore = create<CalendarStore>()((set, get) => ({
	today: new Date().toISOString().split('T')[0],
	selectedDateForCreateEvent: '',
	selectedDateForShow: '',

	setSelectedDateForCreateEvent: (date: string) =>
		set({ selectedDateForCreateEvent: date }),
	setSelectedDateForShow: (date: string) => set({ selectedDateForShow: date }),

	initDates: () => {
		const today = get().today;
		set({
			selectedDateForCreateEvent: today,
			selectedDateForShow: today,
		});
	},
}));
