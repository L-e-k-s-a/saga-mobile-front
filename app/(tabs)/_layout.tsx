import { BORDER_RADII } from '@/shared/constants/borderRadii';
import { COLORS } from '@/shared/constants/colors';
import { MARGINS } from '@/shared/constants/margins';
import { tabsSettingsOptions } from '@/shared/lib/settings-screen/tabs-settings-options';
import { useActionWithFamily } from '@/shared/lib/use-action-with-family';
import { Typography } from '@/shared/ui/Typography/Typography';
import { FamilyModalActions } from '@/widget/FamilyModalActions/FamilyModalActions';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export default function TabsLayout() {
	const { isModalVisible, setIsModalVisible, handleModalVisible } = useActionWithFamily();

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
					name='(navPanel)/settings'
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
			</Tabs>
		</>
	);
}
