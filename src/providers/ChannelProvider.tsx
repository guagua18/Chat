import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { useSupabase } from "./SupabaseProvider"
import { useUser } from "@clerk/clerk-expo"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ActivityIndicator, View, Text } from "react-native"
import { ChannelWithUsers } from "@/types"
import { RealtimeChannel } from "@supabase/supabase-js"
import { set } from "date-fns"

type ChannelContext = {
  channel: ChannelWithUsers | null
  realTimeChannel?: RealtimeChannel | null
}

const ChannelContext = createContext<ChannelContext>({ channel: null })

type ChannelProviderProps = PropsWithChildren<{
  id: string
}>

export default function ChannelProvider({
  children,
  id,
}: ChannelProviderProps) {
  const supabase = useSupabase()

  const [realTimeChannel, setRealTimeChannel] =
        useState<RealtimeChannel | null>(null)
    
    const queryClient = useQueryClient();

  // TODO: Pagination
  // TODO: Pull down to reload
  // TODO: Sort by recent first
  const {
    data: channel,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["channels", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("channels")
        .select("*,users(*)")
        .eq("id", id)
        .throwOnError()
        .single()
      return data
    },
  })

    // REAL TIME SUBSCRIPTIONS
  useEffect(() => {
    // Join a room/topic. Can be anything except for 'realtime'.
    const realTimeChannel = supabase.channel(`channel:${id}:messages`)
    // Simple function to log any messages we receive
    function messageReceived(payload) {
      console.log("REALTIME PAYLOAD:::::")
        console.log(payload);
        queryClient.setQueryData(["messages", id], (oldData : any) => [
            payload.payload,
            ...oldData,
        ])
    }
    // Subscribe to the Channel
    realTimeChannel.on(
      "broadcast",
      { event: "message_sent" }, // Listen for "shout". Can be "*" to listen to all events
      (payload) => messageReceived(payload),
    )

    /**
     * Sending a message after subscribing will use WebSockets
     */
    realTimeChannel.subscribe((status) => {
      if (status !== "SUBSCRIBED") {
        return null
      }
      setRealTimeChannel(realTimeChannel)
    })
    return () => {
      if (realTimeChannel) {
        supabase.removeChannel(realTimeChannel)
        setRealTimeChannel(null)
      }
    }
  }, [])

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error || !channel) {
    return (
      <View>
        <Text className="text-3xl text-red-500 font-bold">
          Channel not found
        </Text>
      </View>
    )
  }

  return (
    <ChannelContext.Provider value={{ channel, realTimeChannel }}>
      {children}
    </ChannelContext.Provider>
  )
}

export const useChannel = () => useContext(ChannelContext)
