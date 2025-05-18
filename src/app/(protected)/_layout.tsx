import { Redirect, router, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import {Entypo, AntDesign, Ionicons} from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProtectedRoutesRootLayout() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href={'/login'} />
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
      <Stack.Screen 
        name='post/[id]' 
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#EB5528'},
          animation: 'slide_from_bottom',
          headerLeft: () => (
            <TouchableOpacity style={styles.circularButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={23} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <View style={styles.circularButton}>
                <AntDesign name="search1" size={21} color="white" />
              </View>

              <View style={styles.circularButton}>
                <MaterialCommunityIcons name="share-outline" size={24} color="white" />
              </View>

              <View style={styles.circularButton}>
                <Entypo name="dots-three-horizontal" size={18} color="white" />
              </View>
            </View>
          )
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  circularButton: {
    backgroundColor: '#1A0E21',
    width: 36,
    height: 36,
    borderRadius: 18, // half of width/height for perfect circle
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    // marginHorizontal: 4, // spacing between buttons
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
})