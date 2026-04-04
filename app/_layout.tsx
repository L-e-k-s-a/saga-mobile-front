import { Stack } from 'expo-router';
import { useAuthStore } from '@/shared/store';

export default function RootLayout() {
  const { isAuth } = useAuthStore();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuth ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}