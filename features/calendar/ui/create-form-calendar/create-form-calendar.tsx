import { HorLayout } from '@/shared/layouts/HorLayout/HorLayout';
import { VerLayout } from '@/shared/layouts/VerLayout/VerLayout';
import { useCalendarStore } from '@/shared/store/calendar/calendar-store';
import { styleForm } from '@/shared/styles/forms';
import { Button } from '@/shared/ui/buttons/button/Button';
import { IndicatorImportant } from '@/shared/ui/indicator-important/indicator-important';
import { Input } from '@/shared/ui/Input/Input';
import { Typography } from '@/shared/ui/typography/typography';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export const CreateFormCalendar = () => {
	const { selectedDate } = useCalendarStore();
	const [isTradition, setIsTradition] = useState(false);

	const [form, setForm] = useState({
		event: isTradition ? 'tradiiton' : 'reminder',
		date: selectedDate,
		title: '',
		description: '',
		importance: 'hard',
	});

	useEffect(() => {
		setForm({
			event: '',
			date: selectedDate,
			title: '',
			description: '',
			importance: 'hard'
		})
	}, [isTradition])

	const disabledSave = form.title === '';

	const handleChangeCreateFormCalendar = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<VerLayout styles={styleFormCalendar.container}>
			<VerLayout styles={styleFormCalendar.date}>
				{isTradition ? (
					<Typography
						textColor='secondary'
						variant='h3'>
						Создать традицию
					</Typography>
				) : (
					<Typography
						textColor='secondary'
						variant='h3'>
						Создать напоминание
					</Typography>
				)}
				<Typography
					textColor='secondary'
					variant='h3'>
					{selectedDate}
				</Typography>
			</VerLayout>
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
							typeIndicator='reminder'
							setIndicator={() => {}}
						/>
					</>
				)}
				<Input
					placeholder='Дополнительно описание'
					value={form.description}
					style={styleForm.input}
					onChangeText={(text) =>
						handleChangeCreateFormCalendar('description', text)
					}
				/>
				<Button
					text='Сохранить'
					fullWidth
					onPress={() => {}}
					disabled={disabledSave}
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
	date: {
		width: '100%',
		alignItems: 'center',
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
