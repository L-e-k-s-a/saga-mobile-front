import { COLORS } from "./colors";



export const IMPORTANCE = {
    hard: {
        importance: 'hardImportant',
        color: COLORS.brown,
        text: "Срочная задача"
    },
    middle: {
        importance: 'middleImportant',
        color: COLORS.yellow,
        text: "Выполнить побыстрее"
    },
    low: {
        importance: 'lowImportant',
        color: COLORS.green,
        text: 'Можно не спешить'
    }
}