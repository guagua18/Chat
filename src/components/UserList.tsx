import { FlatList, Alert, ActivityIndicator, Text } from "react-native";
import UserListItem from "./UserListItem";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Tables } from "@/types/database.types"
import { useQuery } from "@tanstack/react-query"

type User = Tables<'users'>

type UserListProps = {
  onPress?: (user: User) => void;
}

export default function UserList({ onPress }: UserListProps) {

  const supabase = useSupabase();

  const { user } = useUser()

  const { data, error, isLoading } = useQuery({
    querKey: ['users'],
    queryFn: async () => {
      const { data } = await supabase.from('users').select('*').neq('id', user?.id).throwOnError();
      return data;

    }
  })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <UserListItem user={item} onPress={onPress} />}
    />
  )
}