import { COLORS } from "@/shared/constants/colors";

export const headerSettingsOptions = (titleScreen: string, shownHeader: boolean = true) => {
	return {
		title: titleScreen,
		headerShown: shownHeader,
		headerBackTitleVisible: false,
		headerTintColor: COLORS.white,
		headerShadowVisible: false,
		headerStyle: {
			backgroundColor: COLORS.primary,
		},
	};
};
