import { Stack } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
export default function ChatsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          title: "Chats",
          headerLargeTitle: true,
          headerTransparent: true,
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.openDrawer()}
              name="menu-outline"
              size={28}
              className="px-1"
              color="gray"
            />
          ),
          headerRight: () => (
            <Ionicons name="add" size={28} className="px-1" color="gray" />
          )
        })}
      />
    </Stack>
  )
}
