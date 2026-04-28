import { ImportanceIndicator } from "./importance-indicator"

export type TypeEvent = 'tradition' | 'reminder'

export type ReminderOrTradition = {
    typeEvent: TypeEvent,
    date: string,
    familyId: string,
    title: string,
    description: string,
    importance: ImportanceIndicator
}