import { db } from "@/firebase/firebase"
import { Note } from "@/shared/types/note"
import { collection, getDocs, query, where } from "firebase/firestore"


export const getNotes = async (activeFamilyUid: string) => {
    const notesQuery = query (
        collection(db, 'diaries'),
        where('familyId', '==', activeFamilyUid)
    )

    const querySnapshot = await getDocs(notesQuery)

    const notesFamily: Note[] = []

    querySnapshot.forEach((doc) => {
        const data = doc.data()
        notesFamily.push({
            noteId: doc.id,
            familyId: data.familyId,
            description: data.description
        })
    })

    return notesFamily
}