import { db } from "@/firebase/firebase";
import { Task } from "@/shared/types/task";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getTasks = async (activeFamilyUid: string) => {
	const tasksQuery = query(
		collection(db, 'tasks'),
		where('familyId', '==', activeFamilyUid)
	)


	const querySnapshot = await getDocs(tasksQuery)

	const tasksFamily: Task[] = []

	querySnapshot.forEach((doc) => {
		const data = doc.data()
		tasksFamily.push({
			taskId: doc.id,
			familyId: data.familyId,
			description: data.description,
			title: data.title,
			executors: data.executors,
			indicator: data.indicator,
			isCompleted: data.isCompleted
		})
	})

	return tasksFamily 
};



