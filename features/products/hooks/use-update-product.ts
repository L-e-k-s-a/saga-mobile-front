import { db } from "@/firebase/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { SelectedItem } from "../card-product/card-product"

export const useUpdateProduct = () => {
    const updateProduct = async (update: { id: string; productList: SelectedItem[] }) => {
        if (!update.id || !update.productList.length) {
            return;
        }

        try {
            const productRef = doc(db, 'products', update.id);
            const productSnap = await getDoc(productRef);

            if (!productSnap.exists()) {
                console.error('Продукт не найден');
                return;
            }

            const currentData = productSnap.data();
            const currentArray = [...(currentData?.productList || [])]; 

            update.productList.forEach((selectedItem) => {
                if (currentArray[selectedItem.index]) {
                    currentArray[selectedItem.index] = {
                        ...currentArray[selectedItem.index],
                        productName: selectedItem.name,
                        isConfirm: true
                    };
                }
            });

            await updateDoc(productRef, {
                productList: currentArray
            });

        } catch (error) {
            console.error('Ошибка при обновлении продукта:', error);
            throw error;
        }
    };

    return { updateProduct };
};
