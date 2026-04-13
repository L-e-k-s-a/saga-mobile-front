import { BORDER_RADII } from '@/shared/constants/borderRadii';
import { COLORS } from '@/shared/constants/colors';
import { MARGINS } from '@/shared/constants/margins';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarInactiveTintColor: 'gray',
				tabBarStyle: {
					position: 'absolute',
					marginHorizontal: MARGINS.px40,
					marginBottom: MARGINS.px20,
					backgroundColor: COLORS.ligthGray,
					borderTopWidth: 0,
					height: 60,
					paddingBottom: 8,
					paddingTop: 8,
					minHeight: 70,
					borderRadius: BORDER_RADII.px30,
				},
				headerTitleAlign: 'center',
				headerTintColor: COLORS.white,
				headerStyle: {
					backgroundColor: COLORS.darkGray,
					borderBottomWidth: 0,
					borderBottomColor: 'transparent',
				},
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Главная',
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name='home-outline'
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='(navPanel)/favorite'
				options={{
					title: 'Избранное',
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name='heart-outline'
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='(navPanel)/profile'
				options={{
					title: 'Профиль',
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name='person-outline'
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='(navPanel)/settings'
				options={{
					title: 'Настройки',
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name='settings-outline'
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='(album)'
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name='(chat)'
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name='(clubByInterest)'
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name='(familyDiary)'
				options={{
					href: null,
					headerShown: false
				}}
			/>
			<Tabs.Screen
				name='(genealogy)'
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name='(pets)'
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name='(products)'
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name='(tasks)'
				options={{
					href: null,
					headerShown: false
				}}
			/>
			<Tabs.Screen
				name='(calendar)'
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
}
