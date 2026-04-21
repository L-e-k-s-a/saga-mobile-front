import { db } from '@/firebase/firebase';
import { useUserStore } from '@/shared/store/user/user-store';
import { Task } from '@/shared/types/task';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const saveTask = async (task: Task) => {
	const { activeFamily } = useUserStore();

	if (task.title === '' || task.indicator === '') {
		return;
	}
	const ref = doc(db, 'families', activeFamily);
	await updateDoc(ref, {
		tasks: arrayUnion(task),
	});
};
