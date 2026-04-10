import UserList from "@/components/UserList"
import { useSupabase } from "@/providers/SupabaseProvider";
import { User } from "@/types";
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { channel } from "diagnostics_channel";
import { View, Text } from "react-native"

export default function NewChat() {

  const supabase = useSupabase();
  const { user } = useUser();

  const createChannel = useMutation({
    mutationFn: async (clickedUser: User) => {
      console.log("createChannel")
      const { data } = await supabase.from('channels').insert({
        type: 'direct'
      }).throwOnError();

      return data;
    }
  })

  // 1.Create a channel(if it does't exist)
  // 2. Add user to the channel
  // 3. Add myself to the channel
  // 4. Redirect to the channel page

  const handleUserPress = (user: User) => {
    console.log("handleUserPress:", user.id)
    createChannel.mutate(user);
  };

  return (
    <View className="bg-white flex-1">
      <UserList onPress={handleUserPress} />
    </View>
  )
}