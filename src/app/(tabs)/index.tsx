import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import posts from '../../../assets/data/posts.json'
import { formatDistanceToNowStrict } from 'date-fns'
 
export default function HomeScreen() {
  const post = posts[0]
  // console.log(post)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{uri: post.group.image}} style={styles.image} />
        <View style={styles.headerGroup}>
          <Text style={styles.title}>{post.group.name}</Text>
          <Text style={styles.date}>{formatDistanceToNowStrict(post.created_at)} ago</Text>
        </View>

        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Join</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15, 
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row', 
    gap: 15,
    alignItems: 'center'
  },
  image: {
    width: 30, 
    height: 30, 
    borderRadius: 20
  },
  headerGroup: {
    flex: 1, 
    flexDirection: 'row', 
    gap: 6
  },
  title: {
    fontWeight: 'bold',
    // fontSize: 12
  },
  date: {
    color: 'grey',
    // fontSize: 11
  },
  button: {
    backgroundColor: '#1E4396', 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    borderRadius: 20
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold'
  }
})