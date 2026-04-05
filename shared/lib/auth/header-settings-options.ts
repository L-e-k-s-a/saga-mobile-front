import { COLORS } from "@/shared/constants/colors";

export const headerSettingsOptions = (titleScreen: string) => {
	return {
		title: titleScreen,
		headerShown: true,
		headerTintColor: COLORS.white,
		headerShadowVisible: false,
		headerStyle: {
			backgroundColor: COLORS.primary,
		},
	};
};
