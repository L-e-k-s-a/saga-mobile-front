import { useAuthStore } from '@/shared/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
	const { isAuth } = useAuthStore();

	const client = new QueryClient();
	return (
		<GestureHandlerRootView style={styleRoot.root}>
			<QueryClientProvider client={client}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Protected guard={!isAuth}>
						<Stack.Screen name='(auth)'/>
					</Stack.Protected>

					<Stack.Protected guard={isAuth}>
						<Stack.Screen name='(tabs)' />
					</Stack.Protected>
				</Stack>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
}

const styleRoot = StyleSheet.create({
	root: {
		flex: 1,
	},
});
