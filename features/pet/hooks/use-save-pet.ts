import { db } from "@/firebase/firebase"
import { Pet } from "@/shared/types/pet"
import { addDoc, collection } from "firebase/firestore"



export const useSavePets = () => {
    const savePet = async (pet: Pet) => {
        await addDoc(collection(db, 'pets'), {
            ...pet
        })
    }

    return {savePet}
}