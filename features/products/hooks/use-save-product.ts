import { db } from "@/firebase/firebase"
import { Product } from "@/shared/types/product"
import { addDoc, collection } from "firebase/firestore"



export const useSaveProduct = () => {
    const saveProduct = async (product: Product) => {
        await addDoc(collection(db, 'products'), {
            ...product
        })
    }

    return saveProduct
}
