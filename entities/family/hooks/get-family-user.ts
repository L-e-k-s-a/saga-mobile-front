import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const getFamilyUser = async (familyUid: string) => {
	if (familyUid === '') {
		return;
	}
	const familyDoc = doc(db, 'families', familyUid);
	const familySnap = await getDoc(familyDoc);

	if (!familySnap.exists()) {
		return {};
	}
	return familySnap.data()
};
