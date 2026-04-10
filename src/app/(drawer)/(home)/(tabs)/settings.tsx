import { useAuth } from '@clerk/clerk-expo';
import { View, Text, Button } from 'react-native';
import { useSupabase } from '@/providers/SupabaseProvider'

export default function HomeScreen() {
  const { signOut } = useAuth()

  const supabase = useSupabase();

  const testInsert = async () => {
    const { data, error } = await supabase.from('Test').insert({ test: 'Testing inserts2' })
    console.log(error)
  }

  const testFetch = async () => {
    const { data, error } = await supabase.from('Test').select('*')
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl text-blue-500 font-bold bg-red-300 p-8">
        Settings
      </Text>
      <Button onPress={() => signOut()} title="Sign Out" />
      <Button onPress={testInsert} title='Test insert'></Button>
      <Button onPress={testFetch} title='Test fetch'></Button>
    </View>
  )
}

function useSupase(): { supabase: any; } {
  throw new Error('Function not implemented.');
}
