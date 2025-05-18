import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import posts from '../../../../assets/data/posts.json'
import PostListItem from '../../../components/PostListItem'

export default function PostDetails() {
  const {id} = useLocalSearchParams()
  const detailedPost = posts.find((post) => post.id === id)
  // console.log(detailedPost)

  if(!detailedPost) {
    return <Text>Post not found</Text>
  }

  return (
    <View>
      <PostListItem post={detailedPost} isDetailedPost />
    </View>
  )
}