import { db } from '@/firebase/firebase';
import { FamilyUserType } from '@/shared/types/families-user-type';
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

	const familiesUser: FamilyUserType[] = [];

	for (const memberDoc of querySnapshot.docs) {
		const member = memberDoc.data();

		const familyDoc = await getDoc(doc(db, 'families', member.familyId));

		if (familyDoc.exists()) {
			familiesUser.push({
				nameFamily: familyDoc.data().nameFamily,
				inviteCode: familyDoc.data().inviteCode,
			});
		}
	}

	return familiesUser;
};
