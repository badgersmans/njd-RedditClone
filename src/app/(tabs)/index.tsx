import { View } from 'react-native'
import PostListItem from '../../components/PostListItem';
import posts from '../../../assets/data/posts.json'

export default function HomeScreen() {
  return (
    <View>
      <PostListItem post={posts[1]}/>
      <PostListItem post={posts[0]}/>
    </View>
  )
}