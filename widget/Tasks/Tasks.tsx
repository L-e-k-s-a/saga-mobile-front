import { CreateTaskModal } from '@/features/tasks';
import { TasksGroup } from '@/features/tasks/tasks-group/tasks-group';
import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { useUserStore } from '@/shared/store/user/user-store';
import { ButtonAdd } from '@/shared/ui/buttons/button-add/button-add';
import { useState } from 'react';

export const TasksWidget = () => {
	const { activeFamily } = useUserStore()
	const [isVisibleModalCreateTask, setIsVisibleModalCreateTask] =
		useState(false);
	return (
		<BackgroundContainer>
			<AlignContainer>
				<TasksGroup/>
				<CreateTaskModal
					isVisible={isVisibleModalCreateTask}
					setIsVisible={setIsVisibleModalCreateTask}
				/>
				 {activeFamily && <ButtonAdd action={() => setIsVisibleModalCreateTask(true)} />}
			</AlignContainer>
		</BackgroundContainer>
	);
};
