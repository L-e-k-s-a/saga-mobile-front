import { create } from "zustand";

type CalendarStore = {
    selectedDate: string

    setSelectedDate: (date: string) => void
}


export const useCalendarStore = create<CalendarStore>()((set) => ({
    selectedDate: '',

    setSelectedDate: (date: string) => set({selectedDate: date})
}))