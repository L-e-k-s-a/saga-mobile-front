import { COLORS } from '@/shared/constants/colors';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

type HeaderAlign = 'center' | 'left';

type StackScreenSettingsOptions = {
	title: string;
	headerShown: boolean;
	headerBackTitleVisible: boolean;
	headerTintColor: string;
	headerTitleAlign: HeaderAlign;
	headerShadowVisible: boolean;
	headerStyle: NativeStackNavigationOptions['headerStyle'];
};

export const stackScreenSettingsOptions = (
	titleScreen: string,
	shownHeader: boolean = true,
	headerAlign: HeaderAlign = 'center',
): StackScreenSettingsOptions => {
	return {
		title: titleScreen,
		headerShown: shownHeader,
		headerBackTitleVisible: false,
		headerTintColor: COLORS.white,
		headerTitleAlign: headerAlign,
		headerShadowVisible: false,
		headerStyle: {
			backgroundColor: COLORS.primary,
		},
	};
};
