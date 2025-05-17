import { View } from 'react-native'
import PostListItem from '../../components/PostListItem';

export default function HomeScreen() {
  // console.log(post)
  return (
    <View>
      <PostListItem />
      <PostListItem />
    </View>
  )
}