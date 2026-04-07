import { View, TextInput, Pressable,KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"

export default function MessageInput() {
  const [message, setMessage] = useState("")

  const handlesSend = () => {
    console.log("Send message:", message)
    setMessage("")
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={80}>
      <SafeAreaView
        edges={["bottom"]}
        className="p-2 flex-row gap-4 bg-white items-center"
      >
        <Pressable className="bg-gray-200 rounded-full p-2 w-10 h-10">
          <Ionicons name="image" size={20} color="#6B7280" />
        </Pressable>
        <TextInput
          placeholder="Type something....."
          value={message}
          onChangeText={setMessage}
          className="bg-gray-100 flex-1 rounded-3xl px-4 py-3 text-gray-900 text-base max-h-[120px]"
        />
        <Pressable
          onPress={handlesSend}
          disabled={!message}
          className={`${message ? "bg-blue-500" : "bg-gray-200"} rounded-full p-2 w-10 h-10`}
        >
          <Ionicons
            name="send"
            size={20}
            color={message ? "#FFFFFF" : "#6B7280"}
          />
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}