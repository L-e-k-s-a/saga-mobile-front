import { AlignContainer } from '@/shared/layouts/AlignContainer/AlignContainer';
import { BackgroundContainer } from '@/shared/layouts/BackgroundContainer/BackgroundContainer';
import { ButtonAdd } from '@/shared/ui/button-add/button-add';
import { Button } from '@/shared/ui/Button/Button';

export const TasksWidget = () => {

	const handleCreateTask = () => {

	}

	return (
		<BackgroundContainer>
			<AlignContainer>
				<ButtonAdd action={handleCreateTask}/>
			</AlignContainer>
		</BackgroundContainer>
	);
};
