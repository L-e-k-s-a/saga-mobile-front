import { db } from '@/firebase/firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';

export const findFamilyByInviteCode = async (inviteCode: string) => {
	const queryFamily = query(
		collection(db, 'families'),
		where('inviteCode', '==', inviteCode),
	);

    const querySnap = await getDocs(queryFamily);
    if (querySnap.empty) {
        return null;
    }
    
    const doc = querySnap.docs[0];
    return {
        id: doc.id,
    };
};
