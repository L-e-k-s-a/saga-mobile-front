import { Stack } from 'expo-router';
import { useAuthStore } from '@/shared/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
  const { isAuth } = useAuthStore();

  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>

        <Stack.Protected guard={!isAuth}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={isAuth}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>

      </Stack>
    </QueryClientProvider>
  );
}