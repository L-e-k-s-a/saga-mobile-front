import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { Button } from '@/shared/ui/buttons/button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export const CreateFormCalendar = () => {
	const [isTradition, setIsTradition] = useState(false);
	const [form, setForm] = useState({
		title: '',
		description: '',
		importance: '',
	});

	const handleChangeCreateFormCalendar = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<VerLayout styles={styleFormCalendar.container}>
			<HorLayout style={styleFormCalendar.header}>
				<Button
					text='Напоминание'
					style={
						!isTradition ? styleFormCalendar.active : styleFormCalendar.inactive
					}
					onPress={() => setIsTradition(false)}
				/>
				<Button
					text='Традиция'
					style={
						isTradition ? styleFormCalendar.active : styleFormCalendar.inactive
					}
					onPress={() => setIsTradition(true)}
				/>
			</HorLayout>
			<VerLayout>
				<Input
					style={styleForm.input}
					placeholder={isTradition ? 'Традиция' : 'Напоминание'}
					value={form.title}
					onChangeText={(text) => handleChangeCreateFormCalendar('title', text)}
				/>
			</VerLayout>
		</VerLayout>
	);
};

const styleFormCalendar = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
        width: '100%'
	},
	header: {
		gap: 3,
	},
	active: {
		opacity: 1,
	},
	inactive: {
		opacity: 0.4,
	},
});
