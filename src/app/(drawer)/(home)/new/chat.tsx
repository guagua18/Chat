import UserList from "@/components/UserList"
import { User } from "@/types";
import { View, Text } from "react-native"

export default function NewChat() {

  const handleUserPress = (user: User) => {
    console.log("handleUserPress:", user.id)
  };

  return (
    <View className="bg-white">
      <UserList onPress={handleUserPress} />
    </View>
  )
}