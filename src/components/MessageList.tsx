import { FlatList } from "react-native";
import messages from "@/data/messages";
import MessageListItem from "@/components/MessageListItem"

export default function MessageList() { 
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageListItem message={item} />}
      contentInsetAdjustmentBehavior="automatic"
    />
  )
}