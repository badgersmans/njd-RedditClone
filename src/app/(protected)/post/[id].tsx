import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import posts from '../../../../assets/data/posts.json'

export default function PostDetails() {
  const {id} = useLocalSearchParams()
  const detailedPost = posts.find((post) => post.id === id)
  console.log(detailedPost)
  return (
    <View>
      <Text>PostDetails: {id}</Text>
      <Text>{detailedPost?.title}</Text>
    </View>
  )
}