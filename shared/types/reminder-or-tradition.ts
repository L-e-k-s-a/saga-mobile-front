import { ImportanceIndicator } from "./importance-indicator"

export type TypeEvent = 'tradition' | 'reminder'

export type ReminderOrTradition = {
    typeEvent: TypeEvent,
    date: string,
    title: string,
    description: string,
    importance: ImportanceIndicator
}