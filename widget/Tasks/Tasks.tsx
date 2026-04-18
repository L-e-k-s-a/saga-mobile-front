import { CreateTaskModal } from '@/features/tasks';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { useState } from 'react';

export const TasksWidget = () => {
	const [isVisibleModalCreateTask, setIsVisibleModalCreateTask] =
		useState(false);

	const handleCreateTask = () => {
		setIsVisibleModalCreateTask(true);
	};

	return (
		<BackgroundContainer>
			<AlignContainer>
				<CreateTaskModal
					isVisible={isVisibleModalCreateTask}
					setIsVisible={setIsVisibleModalCreateTask}
				/>
				<ButtonAdd action={handleCreateTask} />
			</AlignContainer>
		</BackgroundContainer>
	);
};
