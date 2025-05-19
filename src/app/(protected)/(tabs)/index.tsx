import { ActivityIndicator, FlatList, Text } from 'react-native'
import PostListItem from '../../../components/PostListItem';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../services/postService';

export default function HomeScreen() {
  const {data: posts, isLoading, error} = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts()
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
    />
  )
}