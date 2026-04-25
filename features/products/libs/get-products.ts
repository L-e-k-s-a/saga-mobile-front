import { db } from '@/firebase/firebase';
import { Product } from '@/shared/types/product';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getProducts = async (activeFamilyUid: string) => {
	const productQuery = query(
			collection(db, 'products'),
			where('familyId', '==', activeFamilyUid)
		)	
	
		const querySnapshot = await getDocs(productQuery)
	
		const productsFamily: Product[] = []
	
		querySnapshot.forEach((doc) => {
			const data = doc.data()
			productsFamily.push({
				productId: doc.id,
				familyId: data.familyId,
				nameList: data.nameList,
				productList: data.productList
			})
		})
	
		return productsFamily 
};
