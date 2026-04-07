export type Channel = {
  id: string
  name: string
  lastMessage?: Message
  avatar: string
}

export type Message = {
  id: string
  createdAt: string
  content: string
  user: {
    id: string,
    name: string
    avatar: string
  }
  sender?: User
  image?: string
}

export type User = {
  id: string
  first_name: string
  last_name: string
  full_name: string
  avatar_url?: string | null
  created_at: string
  updated_at: string
}
