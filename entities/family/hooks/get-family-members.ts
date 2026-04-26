import { db } from '@/firebase/firebase';
import { FamilyMember } from '@/shared/types/family-member';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getFamilyMembers = async (familyUid: string) => {
	const queryFamilyMembers = query(
		collection(db, 'familyMembers'),
		where('familyId', '==', familyUid),
	);

    const querySnap = await getDocs(queryFamilyMembers)
    const members: FamilyMember[] = []


    querySnap.forEach((doc) => {
        const data = doc.data()
        members.push({
            userId: data.userId,
            positionInFamily: data.positionInFamily,
            role: data.role
        })
    })
    return members
};
