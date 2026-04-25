import { db } from "@/firebase/firebase"
import { Task } from "@/shared/types/task";
import { addDoc, collection } from "firebase/firestore"


export const useSaveTask = () => {
	const saveTask = async (task: Task) => {
		await addDoc(collection(db, 'tasks'), {
			...task
		})
	}

	return saveTask
};
