import { Slot } from 'expo-router'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query';

export default function RootLayout() {
  const queryClient = new QueryClient()
  useReactQueryDevTools(queryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache}>
        <Slot />
      </ClerkProvider>
    </QueryClientProvider>
  )
}