
export const RoutesForTabs = {
	TASKS: '/(tabs)/(tasks)',
	CALENDAR: '/(tabs)/(calendar)',
	PRODUCTS: '/(tabs)/(products)',
	CHAT: '/(tabs)/(chat)',
	FAMILY_DIARY: '/(tabs)/(familyDiary)',
	ALBUM: '/(tabs)/(album)',
	GENEALOGY: '/(tabs)/(genealogy)',
	PETS: '/(tabs)/(pets)',
	CLUB_BY_INTEREST: '/(tabs)/(clubByInterest)',
} as const

export const RoutesForAuth = {
	SIGN_IN: '/(auth)',
	REGISTER: '/(auth)/register'
} as const

export const Routes = {
	RoutesForTabs,
	RoutesForAuth
} as const

export type TypeRoutesForTabs = typeof RoutesForTabs[keyof typeof RoutesForTabs]
export type TypeRoutes =  typeof Routes[keyof typeof Routes]