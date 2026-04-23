import { db } from '@/firebase/firebase';
import { useUserStore } from '@/shared/store/user/user-store';
import { Task } from '@/shared/types/task';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const useSaveTask = () => {
	const { activeFamily } = useUserStore();

	const saveTask = async (task: Task) => {
		const ref = doc(db, 'families', activeFamily);
		await updateDoc(ref, {
			tasks: arrayUnion(task),
		});
	};

    return saveTask
};
