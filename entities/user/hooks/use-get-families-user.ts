import { Family } from '@/entities/family/type/family';
import { db } from '@/firebase/firebase';
import { useMe } from '@/shared/store/me/useMe';
import { useUserStore } from '@/shared/store/user/user-store';
import {
	collection,
	doc,
	onSnapshot,
	query,
	Unsubscribe,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';


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
		const familyUnsubscribes = new Map<string, Unsubscribe>(); 
		let currentFamilyIds = new Set<string>();

		const familyMembersQuery = query(
			collection(db, 'familyMembers'),
			where('userId', '==', me.uid),
		);

		const unsubscribeFamilyMembers = onSnapshot(
			familyMembersQuery,
			(membersSnapshot) => {
				const newFamilyIds = new Set(
					membersSnapshot.docs.map((doc) => doc.data().familyId),
				);

				currentFamilyIds.forEach((oldId) => {
					if (!newFamilyIds.has(oldId)) {
						const unsubscribe = familyUnsubscribes.get(oldId);
						if (unsubscribe) {
							unsubscribe(); 
							familyUnsubscribes.delete(oldId);
							
							const index = unsubscribes.indexOf(unsubscribe);
							if (index !== -1) {
								unsubscribes.splice(index, 1);
							}
						}
					}
				});

				newFamilyIds.forEach((newId) => {
					if (!currentFamilyIds.has(newId)) {
						const familyDocRef = doc(db, 'families', newId);

						const unsubscribeFamily = onSnapshot(
							familyDocRef,
							(familySnapshot) => {
								if (familySnapshot.exists()) {
									const familyData = familySnapshot.data();
									setFamilies((prev) => {
										const newFamilies = prev.filter((f) => f.uid !== newId);
										return [
											...newFamilies,
											{
												uid: familySnapshot.id,
												nameFamily: familyData.nameFamily,
												inviteCode: familyData.inviteCode,
												familyMembers: familyData.familyMembers || [],
											},
										];
									});
								} else {
									setFamilies((prev) => prev.filter((f) => f.uid !== newId));
								}
								setIsLoading(false);
							},
							(err) => {
								console.error(`Error loading family ${newId}:`, err);
								setError(err);
								setIsLoading(false);
							},
						);

						familyUnsubscribes.set(newId, unsubscribeFamily);
						unsubscribes.push(unsubscribeFamily);
					}
				});

				currentFamilyIds = newFamilyIds;

				if (newFamilyIds.size === 0) {
					setFamilies([]);
					setIsLoading(false);
				}
			},
			(err) => {
				console.error('Error in familyMembers subscription:', err);
				setError(err);
				setIsLoading(false);
			},
		);

		unsubscribes.push(unsubscribeFamilyMembers);

		return () => {
			unsubscribes.forEach((unsub) => unsub());
		};
	}, [me.uid, countFamily]);

	return { families, isLoading, error, refetch: () => {} };
};