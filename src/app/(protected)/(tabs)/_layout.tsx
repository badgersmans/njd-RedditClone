import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';

export default function HomeScreenLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: 'black' }}
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
          tabBarIcon: ({ color }) => <AntDesign name="plus" size={24} color={color} />
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