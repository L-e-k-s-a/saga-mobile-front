import { db } from "@/firebase/firebase"
import { ReminderOrTradition } from "@/shared/types/reminder-or-tradition"
import { addDoc, collection } from "firebase/firestore"




export const useSaveEvent = () => {
    
    const saveEvent = async (event: ReminderOrTradition) => {
        await addDoc(collection(db, 'calendars'), {
            ...event
        })
    }
    return {saveEvent}
}
