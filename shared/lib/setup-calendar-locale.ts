

import { LocaleConfig } from 'react-native-calendars';

export const setupCalendarLocale = () => {
	LocaleConfig.locales.ru = {
		monthNames: [
			'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
			'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
		],
		monthNamesShort: [
			'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
			'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',
		],
		dayNames: [
			'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
			'Четверг', 'Пятница', 'Суббота',
		],
		dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		today: 'Сегодня'
	};
	
	LocaleConfig.defaultLocale = 'ru';
};