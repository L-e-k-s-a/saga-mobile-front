import { COLORS } from '@/shared/constants/colors';
import { useActionWithFamily } from '@/shared/hooks/use-action-with-family';
import { tabsSettingsOptions } from '@/shared/lib/settings-screen/tabs-settings-options';
import { setupCalendarLocale } from '@/shared/lib/setup-calendar-locale';
import { useCalendarStore } from '@/shared/store/calendar/calendar-store';
import { useSettingsStore } from '@/shared/store/settings/settings-store';
import { Typography } from '@/shared/ui/typography/typography';
import { FamilyModalActions } from '@/widget/FamilyModalActions/FamilyModalActions';
import { Ionicons } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';

export default function TabsLayout() {
	setupCalendarLocale();
	const { initDates } = useCalendarStore();
	const { isModalVisible, setIsModalVisible, handleModalVisible } =
		useActionWithFamily();
	const { favorite } = useSettingsStore();

	useEffect(() => {
		initDates()
	}, [])

	return (
		<>
			<FamilyModalActions
				isVisibleModal={isModalVisible}
				setIsVisibleModal={setIsModalVisible}
			/>
			<Tabs
				screenOptions={{
					tabBarInactiveTintColor: 'gray',
					tabBarStyle: {
						position: 'absolute',
						marginHorizontal: 40,
						marginBottom: 20,
						backgroundColor: COLORS.ligthGray,
						borderTopWidth: 0,
						height: 60,
						paddingBottom: 8,
						paddingTop: 8,
						minHeight: 70,
						borderRadius: 30,
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
						headerTitle: () => (
							<TouchableOpacity onPress={handleModalVisible}>
								<Typography variant='h2'>Главная</Typography>
							</TouchableOpacity>
						),
						tabBarIcon: ({ color, size }) => (
							<Ionicons
								name='home-outline'
								size={size}
								color={COLORS.white}
							/>
						),
						tabBarLabelStyle: {
							color: COLORS.white,
						},
					}}
				/>

				<Tabs.Screen
					name='(navPanel)/favorite'
					options={{
						title: 'Избранное',
						tabBarButton: (props) => {
							return (
								<Pressable
									onPress={() => {
										router.navigate(favorite);
									}}
									style={props.style}
									onPressIn={props.onPressIn}
									onPressOut={props.onPressOut}
									onLongPress={props.onLongPress}>
									{props.children}
								</Pressable>
							);
						},
						tabBarIcon: ({ color, size }) => (
							<Ionicons
								name='heart-outline'
								size={size}
								color={COLORS.white}
							/>
						),
						tabBarLabelStyle: {
							color: COLORS.white,
						},
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
								color={COLORS.white}
							/>
						),
						tabBarLabelStyle: {
							color: COLORS.white,
						},
					}}
				/>
				<Tabs.Screen
					name='(navPanel)/(settings)/index'
					options={{
						title: 'Настройки',
						tabBarIcon: ({ color, size }) => (
							<Ionicons
								name='settings-outline'
								size={size}
								color={COLORS.white}
							/>
						),
						tabBarLabelStyle: {
							color: COLORS.white,
						},
					}}
				/>
				<Tabs.Screen
					name='(album)'
					options={tabsSettingsOptions()}
				/>
				<Tabs.Screen
					name='(chat)'
					options={tabsSettingsOptions()}
				/>
				<Tabs.Screen
					name='(clubByInterest)'
					options={tabsSettingsOptions()}
				/>
				<Tabs.Screen
					name='(familyDiary)'
					options={tabsSettingsOptions()}
				/>
				<Tabs.Screen
					name='(genealogy)'
					options={tabsSettingsOptions()}
				/>
				<Tabs.Screen
					name='(pets)'
					options={tabsSettingsOptions()}
				/>
				<Tabs.Screen
					name='(products)'
					options={tabsSettingsOptions()}
				/>
				<Tabs.Screen
					name='(tasks)'
					options={tabsSettingsOptions()}
				/>
				<Tabs.Screen
					name='(calendar)'
					options={tabsSettingsOptions()}
				/>
				<Tabs.Screen
					name='(navPanel)/(settings)/settings-favorite'
					options={{
						title: 'Настройки избранное',
						href: null,
						headerLeft: () => (
							<TouchableOpacity
								style={{ marginLeft: 15 }}
								onPress={() =>
									router.navigate('/(tabs)/(navPanel)/(settings)')
								}>
								<Ionicons
									name='arrow-back'
									size={24}
									color={COLORS.white}
								/>
							</TouchableOpacity>
						),
					}}
				/>
			</Tabs>
		</>
	);
}
