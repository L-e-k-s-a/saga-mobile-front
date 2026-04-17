import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { IndicatorImportant } from '@/shared/ui/indicator-important/indicator-important';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/Typography/Typography';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

type CreateTaskFormType = {
	title: string;
	description: string;
	indicator: string;
	executor: string[];
};

//добавить dropdowm с именами в семье чтобы можно было заполнять исполнителей
export const CreateTaskForm = () => {
    const [indicator, setIndicator] = useState('')
	const [form, setForm] = useState<CreateTaskFormType>({
		title: '',
		description: '',
		indicator: '',
		executor: [],
	});

	const handleChangeCreateTaskForm = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};


    const handleSetIndicator = (value: string) => {
        setForm(prev => ({ ...prev, indicator: value }));
    };

    console.log(form)

	return (
		<VerLayout styles={styleCreateTaskForm.form}>
			<Input
				placeholder='Название задачи'
				value={form.title}
				style={styleForm.input}
                onChangeText={(text) => handleChangeCreateTaskForm("title", text)}
			/>
			<VerLayout styles={styleCreateTaskForm.indicator}>
				<Typography>Важность задачи</Typography>
				<IndicatorImportant setIndicator={handleSetIndicator}/>
			</VerLayout>
			<Input
				placeholder='Дополнительное описание'
				value={form.description}
				style={styleForm.input}
                onChangeText={(text) => handleChangeCreateTaskForm("description", text)}
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
