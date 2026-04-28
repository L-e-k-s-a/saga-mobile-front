import { create } from 'zustand';

type CalendarStore = {
	selectedDateForCreateEvent: string;
	selectedDateForShow: string;

	setSelectedDateForCreateEvent: (date: string) => void;
    setSelectedDateForShow: (date: string) => void
 };

export const useCalendarStore = create<CalendarStore>()((set) => ({
	selectedDateForCreateEvent: '',
	selectedDateForShow: '',

	setSelectedDateForCreateEvent: (date: string) =>
		set({ selectedDateForCreateEvent: date }),
	setSelectedDateForShow: (date: string) => set({ selectedDateForShow: date }),
}));
