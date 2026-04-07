import { View, Text, Image } from "react-native"
import { Message } from "@/types"

type MessageListItemProps = {
  message: Message
  isOwnMessage?: boolean
}

export default function MessageListItem({
  message,
  isOwnMessage,
}: MessageListItemProps) {
  return (
    <View
      className={`flex-row mb-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <View
        className={`max-w-[75%] gap-2 ${isOwnMessage ? "items-end" : "items-start"}`}
      >
        {/* 图片对话 */}
        {message.image && (
          <Image
            source={{ uri: message.image }}
            className="w-48 h-48 rounded-lg"
          />
        )}
        {/* 文字对话 */}
        {message.content && (
          <View
            className={`rounded-2xl px-4 py-2 ${isOwnMessage ? "bg-blue-500 rounded-br-md" : "bg-gray-200 rounded-bl-md"}`}
          >
            <Text
              className={`text-base ${isOwnMessage ? "text-white" : "text-gray-900"}`}
            >
              {message.content}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
