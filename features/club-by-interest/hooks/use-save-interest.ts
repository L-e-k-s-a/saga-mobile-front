import { db } from '@/firebase/firebase';
import { Interest } from '@/shared/types/interest';
import { addDoc, collection } from 'firebase/firestore';

export const useSaveInterest = () => {
	const saveInterest = async (interest: Interest) => {
		await addDoc(collection(db, 'clubsInterested'), {
			...interest,
		});
	};
	return { saveInterest };
};
