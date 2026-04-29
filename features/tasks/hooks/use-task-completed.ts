import { updateOneDoc } from '@/shared/lib/updateOneDoc';
import { Task } from '@/shared/types/task';

export const useSetTaskCompleted = () => {
	const setTaskCompleted = async (task: Task) => {
		await updateOneDoc('tasks', 'isCompleted', true, task.id);
	};
    return { setTaskCompleted }
};
