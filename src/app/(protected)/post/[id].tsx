import { View, Text, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import PostListItem from '../../../components/PostListItem'
import { fetchPostById } from '../../services/postService'
import { useQuery } from '@tanstack/react-query'
import { useSupabase } from '../../../lib/supabase'

export default function PostDetails() {
  const supabase = useSupabase()
  const {id} = useLocalSearchParams<{id: string}>()
  const {data, isLoading, error} = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id, supabase)
  })

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error || !data) {
    return <Text>Post not found</Text>
  }

  return (
    <View>
      <PostListItem post={data} isDetailedPost />
    </View>
  )
}