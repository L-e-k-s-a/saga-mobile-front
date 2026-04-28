import { ImportanceIndicator } from "@/shared/types/importance-indicator";




export const getImportanceColor = (typeEvent: 'reminder' | 'tradition', importance: ImportanceIndicator) => {
    if(typeEvent === 'reminder'){
        if(importance === "hard"){
            return "#560000"
        }
        else if(importance === 'middle'){
            return "#ffd500"
        }
        else{
            return "#00CC29"
        }
    }else{
        if(importance === "hard"){
            return '#0C0AAF'
        }else if (importance === "middle"){
            return '#56165C'
        }else{
            return "#0EDBDF"
        }
    }
}