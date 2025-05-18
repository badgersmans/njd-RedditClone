import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function ProtectedRoutesRootLayout() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href={'/login'} />
  }

  return (
    <Stack screenOptions={{headerShown: false}}/>
  )
}