import { FlatList } from "react-native";
import messages from "@/data/messages";
import MessageListItem from "@/components/MessageListItem"

export default function MessageList() { 
  const myId = "u-1"

  return (
    <FlatList
      data={messages}
      contentContainerClassName='p-4'
      renderItem={({ item }) => (
        <MessageListItem message={item} isOwnMessage={item.user.id === myId} />
      )}
      // contentInsetAdjustmentBehavior="automatic"
      inverted
      showsVerticalScrollIndicator={false}
    />
  )
}