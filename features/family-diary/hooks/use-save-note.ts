import { db } from "@/firebase/firebase"
import { Note } from "@/shared/types/note"
import { addDoc, collection } from "firebase/firestore"





export const useSaveNote = () => {
    const saveNote = async (note: Note) => {
        await addDoc(collection(db, 'diaries'), {
            ...note
        })
    }
    return {saveNote}
}