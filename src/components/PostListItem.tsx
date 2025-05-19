import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { formatDistanceToNowStrict } from 'date-fns'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Post } from '../types/types';
import { Link } from 'expo-router';

type PostListItem = {
  post: Post,
  isDetailedPost?: boolean
}

export default function PostListItem({post, isDetailedPost}: PostListItem) {
  const shouldShowImage = isDetailedPost || post.image // is detailed post OR has image
  const shouldShowDescription = isDetailedPost || !post.image // is detailed post OR has NO image
  return (
    <Link href={`/post/${post.id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: post.group.image }} style={styles.headerImage} />

          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.groupName}>{post.group.name}</Text>
              <Text style={styles.date}>{formatDistanceToNowStrict(post.created_at)}</Text>
            </View>
            {isDetailedPost && <Text style={styles.username}>{post.user.name}</Text>}
          </View>

          <TouchableOpacity style={{marginLeft: 'auto'}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Join</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Text style={styles.title}>{post.title}</Text>
        {shouldShowImage && post.image && (
          <Image source={{ uri: post.image }} style={styles.image} />
        )}

        {shouldShowDescription && post.description && (
          <Text style={styles.description} numberOfLines={4}>{post.description}</Text>
        )}

        {/* Footer */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={[{ flexDirection: 'row' }, styles.iconBox]}>
              <MaterialCommunityIcons name="arrow-up-bold-outline" size={19} color="black" />
              <Text style={{ fontWeight: '500', marginLeft: 5, alignSelf: 'center' }}>{post.upvotes}</Text>
              <View style={{ width: 1, backgroundColor: '#D4D4D4', height: 14, marginHorizontal: 7, alignSelf: 'center' }} />
              <MaterialCommunityIcons name="arrow-down-bold-outline" size={19} color="black" />
            </View>
            <View style={[{ flexDirection: 'row' }, styles.iconBox]}>
              <MaterialCommunityIcons name="comment-outline" size={19} color="black" />
              <Text style={{ fontWeight: '500', marginLeft: 5, alignSelf: 'center' }}>{post.nr_of_comments}</Text>
            </View>
          </View>
          <View style={{ marginLeft: 'auto', flexDirection: 'row', gap: 10 }}>
            <MaterialCommunityIcons name="trophy-outline" size={19} color="black" style={styles.iconBox} />
            <MaterialCommunityIcons name="share-outline" size={19} color="black" style={styles.iconBox} />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    // width: '100%'
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 8,
    // backgroundColor: 'green'
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 20
  },
  headerTitle: {
    fontWeight: 'semibold',
    fontSize: 12,
  },
  groupName: {
    marginRight: 10
  },
  date: {
    color: 'grey',
  },
  username:{
    color: 'grey',
    marginTop: 3
  },
  button: {
    backgroundColor: '#1E4396',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 15,
    marginTop: 10,
  },
  description: {
    marginTop: 10,
    // lineHeight: 18
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10
    // backgroundColor: 'red'
    // gap: 5
  },
  iconBox: {
    borderWidth: 0.5,
    borderColor: '#D4D4D4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 15
  },
})