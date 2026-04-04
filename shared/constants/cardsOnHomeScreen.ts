import { ImageSourcePropType } from 'react-native';
import { RoutesForTabs, TypeRoutesForTabs } from '../routes/routes';

type TypeCardHomeScreen = {
	title: string;
	image: ImageSourcePropType;
	route: TypeRoutesForTabs;
};

export const CARDS_HOME_SCREEN: TypeCardHomeScreen[] = [
	{
		title: 'Список задач',
		image: require('../../assets/tasks.png'),
		route: RoutesForTabs.TASKS,
	},
	{
		title: 'Календарь',
		image: require('../../assets/calendar.png'),
		route: RoutesForTabs.CALENDAR,
	},
	{
		title: 'Продукты и товары',
		image: require('../../assets/products.png'),
		route: RoutesForTabs.PRODUCTS,
	},
	{
		title: 'Семейный чат',
		image: require('../../assets/chat.png'),
		route: RoutesForTabs.CHAT,
	},
	{
		title: 'Семейный дневник',
		image: require('../../assets/diaryFamily.webp'),
		route: RoutesForTabs.FAMILY_DIARY,
	},
	{
		title: 'Фотоальбом',
		image: require('../../assets/album.png'),
		route: RoutesForTabs.ALBUM,
	},
	{
		title: 'Генеалогия',
		image: require('../../assets/familyTree.png'),
		route: RoutesForTabs.GENEALOGY,
	},
	{
		title: 'Питомцы',
		image: require('../../assets/pets.png'),
		route: RoutesForTabs.PETS,
	},
	{
		title: 'Клуб по интересам',
		image: require('../../assets/clubInteresting.png'),
		route: RoutesForTabs.CLUB_BY_INTEREST,
	},
] as const;
