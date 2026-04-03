import { View, Text, Image,Pressable } from "react-native"
import { Channel } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { Link } from "expo-router"

type ChannelListItemProps = {
  channel: Channel
}

export default function ChannelListItem({ channel }: ChannelListItemProps) {
  return (
    <Link href={`/channel/${channel.id}`} asChild>
      <Pressable className="flex-row gap-3 p-4 border-b border-gray-200">
        <Image
          source={{ uri: channel.avatar }}
          className="w-10 h-10 rounded-full"
        />
        <View className="flex-1">
          <Text
            className="font-bold text-lg text-neutral-600"
            numberOfLines={1}
          >
            {channel.name}
          </Text>
          <Text className="font-bold text-gray-500" numberOfLines={1}>
            {channel.lastMessage?.content || "No messages yet"}
          </Text>
        </View>

        {channel.lastMessage?.createdAt && (
          <Text className="text-xs text-neutral-500">
            {formatDistanceToNow(new Date(channel.lastMessage.createdAt), {
              addSuffix: true,
            })}
          </Text>
        )}
      </Pressable>
    </Link>
  )
}
