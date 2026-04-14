import UserList from "@/components/UserList"
import { useSupabase } from "@/providers/SupabaseProvider";
import { User } from "@/types";
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { channel } from "diagnostics_channel";
import { router } from "expo-router";
import { View, Text } from "react-native"

// TODO: 检查是否已存在与点击用户的直接沟通渠道

export default function NewChat() {

  const supabase = useSupabase();
  const { user } = useUser();

  const createChannel = useMutation({
    mutationFn: async (clickedUser: User) => {
      // 1.Create a channel(if it does't exist)
      const { data: channel } = await supabase.from('channels').insert({
        type: 'direct'
      }).throwOnError().select('*').single();

      if (!channel) {
        throw new Error('通道为空');
      }

      // 2. Add user to the channel
      await supabase.from('channel_users').insert({
        channel_id: channel.id,
        user_id: clickedUser.id
      }).throwOnError();

      // 3. Add myself to the channel
      await supabase.from('channel_users').insert({
        channel_id: channel.id,
        user_id: user!.id
      }).throwOnError();

      return channel;
    },
    onSuccess(newChannel) {
      // 4. Redirect to the channel page
      router.back()
      router.push(`/channel/${newChannel.id}`)
    }
  })





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