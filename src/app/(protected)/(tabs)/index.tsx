import { FlatList } from 'react-native'
import PostListItem from '../../../components/PostListItem';
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react';
import { Tables } from "../../../types/database.types";
import { useQuery } from '@tanstack/react-query';

type PostWithGroupAndName = Tables<'posts'> & {
  user: Tables<'users'>
  group: Tables<'groups'>
}

export default function HomeScreen() {
  const {data: posts} = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts()
  });
  // console.log(posts)

  // const [posts, setPosts] = useState<PostWithGroupAndName[]>([])
  
  // useEffect(() => {
  //   fetchPosts()
  // }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts')
    .select('*, group:groups(*), user:users!posts_user_id_fkey(*)'); // group:groups meaning rename groups to group
    // console.log(JSON.stringify(data, null, 2))
    if(error) {
      console.log(error)
    } else {
      return data
    }
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