import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { styleForm } from '@/shared/styles/forms';
import { Button } from '@/shared/ui/buttons/button/Button';
import { IndicatorImportant } from '@/shared/ui/indicator-important/indicator-important';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/typography/typography';
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
			<VerLayout styles={styleFormCalendar.body}>
				<Input
					style={styleForm.input}
					placeholder={isTradition ? 'Традиция' : 'Напоминание'}
					value={form.title}
					onChangeText={(text) => handleChangeCreateFormCalendar('title', text)}
				/>
				{isTradition ? (
					<>
						<Typography textColor='secondary'>Важность традиции</Typography>
						<IndicatorImportant
							typeIndicator='tradition'
							setIndicator={() => {}}
						/>
					</>
				) : (
					<>
						<Typography textColor='secondary'>Важность напоминания</Typography>
						<IndicatorImportant
							typeIndicator='task'
							setIndicator={() => {}}
						/>
					</>
				)}
				<Input
					placeholder='Дополнительно описание'
					value=''
					style={styleForm.input}
				/>
				<Button
					text='Сохранить'
					fullWidth
					onPress={() => {}}
				/>
			</VerLayout>
		</VerLayout>
	);
};

const styleFormCalendar = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	header: {
		gap: 3,
	},
	body: {
		width: '100%',
		gap: 10,
		alignItems: 'center',
	},
	active: {
		opacity: 1,
	},
	inactive: {
		opacity: 0.4,
	},
});
