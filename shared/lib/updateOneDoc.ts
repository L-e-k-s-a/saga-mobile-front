import { db } from "@/firebase/firebase"
import { doc, setDoc } from "firebase/firestore"



export const updateOneDoc = async (collection: string, field: string, value: string, uid: string) => {
    
    const ref = doc(db, collection, uid)
    await setDoc(ref, {
        [field]: value
    }, {merge: true})
}