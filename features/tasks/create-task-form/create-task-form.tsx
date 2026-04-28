import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { Task } from '@/shared/types/task';
import { Button } from '@/shared/ui/buttons/button/Button';
import { IndicatorImportant } from '@/shared/ui/indicator-important/indicator-important';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/typography/typography';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSaveTask } from '../hooks/use-save-task';
import { useUserStore } from '@/shared/store/user/user-store';

type CreateTaskFormProps = {
	setIsVisible: (isVisible: boolean) => void;
};

//добавить dropdowm с именами в семье чтобы можно было заполнять исполнителей
export const CreateTaskForm = ({ setIsVisible }: CreateTaskFormProps) => {
	const { activeFamily } = useUserStore()
	const saveTask = useSaveTask();
	const [form, setForm] = useState<Task>({
		taskId: '',
		familyId: activeFamily,
		title: '',
		description: '',
		indicator: 'hard',
		isCompleted: false,
		executors: [],
	});

	const disabled = form.title === ''

	const handleChangeCreateTaskForm = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSetIndicator = (value: string) => {
		setForm((prev) => ({ ...prev, indicator: value }));
	};

	const handleSave = () => {
		saveTask(form);
		setIsVisible(false);
	};

	return (
		<VerLayout styles={styleCreateTaskForm.form}>
			<Input
				placeholder='Название задачи'
				value={form.title}
				style={styleForm.input}
				onChangeText={(text) => handleChangeCreateTaskForm('title', text)}
			/>
			<VerLayout styles={styleCreateTaskForm.indicator}>
				<Typography textColor='secondary'>Важность задачи</Typography>
				<IndicatorImportant typeIndicator='task' setIndicator={handleSetIndicator} />
			</VerLayout>
			<Input
				placeholder='Дополнительное описание'
				value={form.description}
				style={styleForm.input}
				onChangeText={(text) => handleChangeCreateTaskForm('description', text)}
			/>
			<Button
				text='Сохранить'
				disabled={disabled}
				size='m'
				onPress={handleSave}
				fullWidth
			/>
		</VerLayout>
	);
};

const styleCreateTaskForm = StyleSheet.create({
	form: {
		alignItems: 'center',
		gap: 15,
	},
	indicator: {
		gap: 5,
	},
});
