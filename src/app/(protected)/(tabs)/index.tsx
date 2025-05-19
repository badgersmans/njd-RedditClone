import { ActivityIndicator, FlatList, Text } from 'react-native'
import PostListItem from '../../../components/PostListItem';
import { supabase } from '../../../lib/supabase';
import { Tables } from "../../../types/database.types";
import { useQuery } from '@tanstack/react-query';

type PostWithGroupAndName = Tables<'posts'> & {
  user: Tables<'users'>
  group: Tables<'groups'>
}

export default function HomeScreen() {
  const {data: posts, isLoading, error} = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts()
  });

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts')
    .select('*, group:groups(*), user:users!posts_user_id_fkey(*)'); // group:groups meaning rename groups to group
    // console.log(JSON.stringify(data, null, 2))
    if(error) {
      throw error
    } else {
      return data
    }
  }

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
    />
  )
}