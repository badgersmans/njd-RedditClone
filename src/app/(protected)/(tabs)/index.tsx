import { FlatList } from 'react-native'
import PostListItem from '../../../components/PostListItem';
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react';
import { Post } from '../../../types/types';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts')
    .select('*, group:groups(*), user:users!posts_user_id_fkey(*)'); // group:groups meaning rename groups to group
    // console.log(JSON.stringify(data, null, 2))
    // console.log(error)
    setPosts(data)
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