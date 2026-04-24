import { createContext, PropsWithChildren, useContext } from "react"
import { useSupabase } from "./SupabaseProvider";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, View, Text } from "react-native";
import { ChannelWithUsers } from "@/types";

type ChannelContext = {
    channel: ChannelWithUsers | null
}

const ChannelContext = createContext<ChannelContext>({ channel: null })

type ChannelProviderProps = PropsWithChildren<{
    id: string
}>

export default function ChannelProvider({ children, id }: ChannelProviderProps) {
    const supabase = useSupabase()

    // TODO: Pagination
    // TODO: Pull down to reload
    // TODO: Sort by recent first
    const { data: channel, error, isLoading } = useQuery({
        queryKey: ['channels', id],
        queryFn: async () => {
            const { data } = await supabase.from('channels').select('*,users(*)').eq('id', id).throwOnError().single();
            return data;
        }
    })

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
        <ChannelContext.Provider value={{ channel }}>
            {children}
        </ChannelContext.Provider>
    )
}

export const useChannel = () => useContext(ChannelContext)