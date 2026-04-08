import {
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  Image,
  StyleSheet,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import * as ImagePicker from "expo-image-picker"

export default function MessageInput() {
  const [message, setMessage] = useState("")
  const [image, setImage] = useState<string | null>(null)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      )
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handlesSend = () => {
    console.log("Send message:", message)
    setMessage("")
    setImage(null)
  }

  const isMessageEmpty = !message && !image

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <SafeAreaView
        edges={["bottom"]}
        className="p-2 gap-4 bg-white border-t border-gray-200"
      >
        {image && (
          <View className="w-32 h-32">
            <Image source={{ uri: image }} className="w-full h-full" />
            <Pressable
              onPress={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-gray-100 w-6 h-6 items-center justify-center rounded-full"
            >
              <Ionicons name="close" size={14} color="dimray" />
            </Pressable>
          </View>
        )}
        <View className="flex-row  items-center gap-2">
          <Pressable
            onPress={pickImage}
            className="bg-gray-200 rounded-full p-2 w-10 h-10"
          >
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
            disabled={isMessageEmpty}
            className={`${isMessageEmpty ? "bg-gray-200" : "bg-blue-500"} rounded-full p-2 w-10 h-10`}
          >
            <Ionicons
              name="send"
              size={20}
              color={isMessageEmpty ? "#9CA3AF" : "#FFFFFF"}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
