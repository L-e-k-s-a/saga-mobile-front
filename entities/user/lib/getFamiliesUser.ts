import { Family } from '@/entities/family/family';
import { db } from '@/firebase/firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';

export const getFamiliesUser = async (userId: string) => {
	const familiesQuery = query(
		collection(db, 'familyMembers'),
		where('userId', '==', userId),
	);

	const querySnapshot = await getDocs(familiesQuery);

	const familiesUser: Family[] = [];

	for (const memberDoc of querySnapshot.docs) {
		const member = memberDoc.data();

		const familyDocRef = doc(db, 'families', member.familyId);
		const familyDoc = await getDoc(familyDocRef);

		if (familyDoc.exists()) {
			const familyData = familyDoc.data();
			familiesUser.push({
				uid: familyDoc.id,
				nameFamily: familyData.nameFamily,
				inviteCode: familyData.inviteCode,
			});
		}
	}

	return familiesUser;
};
