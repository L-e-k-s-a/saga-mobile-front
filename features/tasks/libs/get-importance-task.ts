import { IMPORTANCE } from '@/shared/constants/importance';
import { Task } from '@/shared/types/task';

export const getImportanceTask = (task: Task) => {
	if (task.indicator === 'low') return IMPORTANCE.low;
	if (task.indicator === 'middle') return IMPORTANCE.middle;
	if (task.indicator === 'hard') return IMPORTANCE.hard;
	return { importance: '', color: '', text: '' };
};
