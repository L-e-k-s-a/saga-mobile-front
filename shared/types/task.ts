

export type Task = {
	id: string
	familyId: string,
	title: string;
	description: string;
	indicator: string;
	isCompleted: boolean;
	executors: string[];
};