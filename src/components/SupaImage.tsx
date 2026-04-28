import { useSupabase } from "@/providers/SupabaseProvider";
import { useQuery } from "@tanstack/react-query";
import { Image, ImageProps } from "react-native";

type SupaImageProps = {
  path: string;
} & ImageProps;

export default function SupaImage({ path, ...ImageProps }: SupaImageProps) {
  const supabase = useSupabase()

  const { data } = useQuery({
    queryKey: ['supa-image', path],
    queryFn: async () => {
      const { data } = await supabase.storage.from("images").createSignedUrl(path,3600)
      return data?.signedUrl ?? ""
    }
  })

  return <Image {...ImageProps} source={{ uri: data }} />
}