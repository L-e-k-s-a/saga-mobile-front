import { db } from "@/firebase/firebase"
import { Product, ProductAndOrder } from "@/shared/types/product"
import { addDoc, collection } from "firebase/firestore"



export const useSaveProduct = () => {
    const saveProduct = async (product: ProductAndOrder) => {
        await addDoc(collection(db, 'products'), {
            ...product
        })
    }

    return saveProduct
}
