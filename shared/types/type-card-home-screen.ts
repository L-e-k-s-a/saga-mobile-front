import { ImageSourcePropType } from 'react-native';
import { RoutesForTabs, TypeRoutesForTabs } from '../routes/routes';

export type TypeCardHomeScreen = {
	title: string;
	image: ImageSourcePropType;
	route: TypeRoutesForTabs;
};