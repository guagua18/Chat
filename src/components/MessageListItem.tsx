import { View, Text } from "react-native"
import { Message } from "@/types"

type MessageListItemProps = {
  message: Message
}

export default function MessageListItem({ message }: MessageListItemProps) {
  return (
    <View>
      <Text className="text-2xl">{message.content}</Text>
    </View>
  )
}