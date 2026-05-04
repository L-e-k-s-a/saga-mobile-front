import { Family } from '@/entities/family/type/family';
import { useMe } from '@/shared/store/me/useMe';
import { useUserStore } from '@/shared/store/user/user-store';
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query, where, Unsubscribe } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export const useFamiliesUsers = () => {
	const [families, setFamilies] = useState<Family[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const me = useMe();
	const { countFamily } = useUserStore();

	useEffect(() => {
		if (!me.uid) {
			setIsLoading(false);
			setFamilies([]);
			return;
		}

		setIsLoading(true);
		setError(null);

		const unsubscribes: Unsubscribe[] = [];

		const familyMembersQuery = query(
			collection(db, 'familyMembers'),
			where('userId', '==', me.uid)
		);

		const unsubscribeFamilyMembers = onSnapshot(
			familyMembersQuery,
			(membersSnapshot) => {
				unsubscribes.forEach(unsub => unsub());
				unsubscribes.length = 0;

				const membersData = membersSnapshot.docs.map(doc => ({
					id: doc.id,
					familyId: doc.data().familyId
				}));

				if (membersData.length === 0) {
					setFamilies([]);
					setIsLoading(false);
					return;
				}

				const familiesMap = new Map<string, Family>();

				membersData.forEach(member => {
					const familyDocRef = doc(db, 'families', member.familyId);
					
					const unsubscribeFamily = onSnapshot(
						familyDocRef,
						(familySnapshot) => {
							if (familySnapshot.exists()) {
								const familyData = familySnapshot.data();
								familiesMap.set(familySnapshot.id, {
									uid: familySnapshot.id,
									nameFamily: familyData.nameFamily,
									inviteCode: familyData.inviteCode,
									familyMembers: familyData.familyMembers || []
								});
								
								setFamilies(Array.from(familiesMap.values()));
							} else {
								familiesMap.delete(member.familyId);
								setFamilies(Array.from(familiesMap.values()));
							}
							setIsLoading(false);
						},
						(err) => {
							console.error(`Error loading family ${member.familyId}:`, err);
							setError(err);
							setIsLoading(false);
						}
					);
					
					unsubscribes.push(unsubscribeFamily);
				});
			},
			(err) => {
				console.error("Error in familyMembers subscription:", err);
				setError(err);
				setIsLoading(false);
			}
		);

		unsubscribes.push(unsubscribeFamilyMembers);

		return () => {
			unsubscribes.forEach(unsub => unsub());
		};
	}, [me.uid, countFamily]);

	return { families, isLoading, error, refetch: () => {} };
};