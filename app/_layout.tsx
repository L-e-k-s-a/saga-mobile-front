import { Stack } from 'expo-router';
import { useAuthStore } from '@/shared/store';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '@/shared/client/client';
export default function RootLayout() {
  const { isAuth } = useAuthStore();

  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuth ? (
          <Stack.Screen name="(auth)" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
    </ApolloProvider>
  );
}