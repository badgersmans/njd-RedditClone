import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function HomeScreenLayout() {
  const {signOut} = useAuth()

  return (
    <Tabs
      screenOptions={{ 
        tabBarActiveTintColor: 'black',
        headerRight: () =>
          <TouchableOpacity 
            onPress={() => signOut()}
            style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}
          >
            <Feather
              name="log-out"
              size={18}
              color="black"
              style={{ paddingLeft: 8, transform: [{ scaleX: -1 }] }}
            />
              <Text>Sign Out</Text>
          </TouchableOpacity>
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Reddit',
          title: 'Home',
          headerTintColor: "#EB5528",
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          headerTitle: 'Communities',
          title: 'Communities',
          headerTintColor: "#EB5528",
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerTitle: 'Create',
          title: 'Create',
          headerTintColor: "#EB5528",
          tabBarIcon: ({ color }) => <AntDesign name="plus" size={24} color={color} />,
          headerShown: false,
          tabBarStyle: {display: 'none'}
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerTitle: 'Chat',
          title: 'Chat',
          headerTintColor: "#EB5528",
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          headerTitle: 'Inbox',
          title: 'Inbox',
          headerTintColor: "#EB5528",
          tabBarIcon: ({ color }) => <Feather name="bell" size={24} color={color} />
        }}
      />
    </Tabs>
  )
}