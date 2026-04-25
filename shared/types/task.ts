

export type Task = {
	taskId: string,
	familyId: string,
	title: string;
	description: string;
	indicator: string;
	isCompleted: boolean;
	executors: string[];
};