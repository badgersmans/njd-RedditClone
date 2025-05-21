import { ActivityIndicator, FlatList, Text } from 'react-native'
import PostListItem from '../../../components/PostListItem';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../services/postService';
import { useSupabase } from '../../../lib/supabase';

export default function HomeScreen() {
  const supabase = useSupabase()

  const {
    data: posts, 
    isLoading, 
    error,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(supabase)
  });

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error) {
    return <Text>Error getting posts...</Text>
  }

  return (
    <FlatList 
      data={posts}
      renderItem={({item}) => (
        <PostListItem post={item}/>
      )}
      onRefresh={refetch}
      refreshing={isRefetching}
    />
  )
}