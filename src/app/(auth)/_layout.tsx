import { Stack, Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesRootLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return <Stack />
}