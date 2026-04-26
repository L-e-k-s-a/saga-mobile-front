import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const getFamilyUser = async (familyUid: string) => {
	const familyDoc = doc(db, 'families', familyUid);
	const familySnap = await getDoc(familyDoc);

	if (!familySnap.exists()) {
		throw new Error(`Семья с ID ${familyUid} не найдена`);
	}

	const data = familySnap.data();
	
	return {
		id: familySnap.id,
		inviteCode: data.inviteCode,
		nameFamily: data.nameFamily,
	};
};