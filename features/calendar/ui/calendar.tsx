import { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.ru = {
	monthNames: [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	],
	monthNamesShort: [
		'Янв',
		'Фев',
		'Мар',
		'Апр',
		'Май',
		'Июн',
		'Июл',
		'Авг',
		'Сен',
		'Окт',
		'Ноя',
		'Дек',
	],
	dayNames: [
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
		'Воскресенье',
	],
	dayNamesShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
};

export const CalendarSaga = () => {
      const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
	return (
		<Calendar
			// Отметки на днях с событиями
			markedDates={{
				'2026-04-22': { marked: true, dotColor: 'red' },
				'2026-04-25': { marked: true, dotColor: 'blue' },
				[selectedDate]: { selected: true, selectedColor: '#2196f3' },
			}}
			onDayPress={(day) => {
				setSelectedDate(day.dateString);
				// Добавить событие
			}}
			// Включить переключение месяцев
			enableSwipeMonths={true}
			// Показать индикатор загрузки
			displayLoadingIndicator={true}
			// Минимум и максимум дат
			minDate={'2020-01-01'}
			maxDate={'2030-12-31'}
			// Первый день недели - понедельник
			firstDay={1}
			// Заголовок с месяцем/годом
			hideExtraDays={true}
		/>
	);
};
