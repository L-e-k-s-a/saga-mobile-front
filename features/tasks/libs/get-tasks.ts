import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getTasks = async (activeFamilyUid: string) => {
	const familyDocRef = doc(db, 'families', activeFamilyUid);
	const familySnapshot = await getDoc(familyDocRef);

	if (!familySnapshot.exists()) {
		return []
	}
	return familySnapshot.data().tasks;
	
};
