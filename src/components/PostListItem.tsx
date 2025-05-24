import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { formatDistanceToNowStrict } from 'date-fns'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import { Tables } from "../types/database.types";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '../lib/supabase';
import { deleteMyVotes, selectMyVotes, upvotePost } from '../app/services/upvotesService';
import { useSession } from '@clerk/clerk-expo';
import { useState } from 'react';

type PostListItem = {
  post: PostWithGroupAndName,
  isDetailedPost?: boolean,
  upvotes: { sum: number }[]
}

type PostWithGroupAndName = Tables<'posts'> & {
  // user: Tables<'users'>
  group: Tables<'groups'>
}

export default function PostListItem({ post, isDetailedPost }: PostListItem) {
  const shouldShowImage = isDetailedPost || post.image // is detailed post OR has image
  const shouldShowDescription = isDetailedPost || !post.image // is detailed post OR has NO image
  const supabase = useSupabase()
  const queryClient = useQueryClient();
  const {session} = useSession();

  const {data: myVote, isLoading, error} = useQuery({
    queryKey: ['posts', post.id, 'my-votes'],
    queryFn: () => selectMyVotes(post.id, session?.user.id, supabase)
  })
  const [localVote, setLocalVote] = useState(myVote?.value ?? 0);
  const isUpvoted = localVote === 1;
  const isDownvoted = localVote === -1;
  // console.log(myVote)

  const { mutate: upvote, isPending } = useMutation({
    mutationFn: (value: 1 | -1) => upvotePost(post.id, value, supabase),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const { mutate: removeVote } = useMutation({
    mutationFn: () => deleteMyVotes(post.id, session?.user.id, supabase),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const onVotePressed = (vote: 1 | -1) => {
    
    // console.log(`isUpvoted? ${isUpvoted}`)
    // console.log(`isDownvoted ${isDownvoted}`)

  if ((vote === 1 && isUpvoted) || (vote === -1 && isDownvoted)) {
      removeVote()
      setLocalVote(0)
    } else {
      upvote(vote)
      setLocalVote(vote)
    }
  }

  return (
    <View>
      <Link href={`/post/${post.id}`} asChild>
        <Pressable style={styles.container}>
          <View style={styles.headerContainer}>
            <Image source={{ uri: post.group.image }} style={styles.headerImage} />

            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.groupName}>{post.group.name}</Text>
                <Text style={styles.date}>{formatDistanceToNowStrict(post.created_at)}</Text>
              </View>
              {isDetailedPost && <Text style={styles.username}>{post.user?.name}</Text>}
            </View>

            <TouchableOpacity style={{ marginLeft: 'auto' }}>
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
        </Pressable>
      </Link>
      {/* Footer */}
      <View style={styles.footer}>
        {/* Upvote Buttons */}
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => onVotePressed(1)} style={styles.left}>
            <MaterialCommunityIcons 
              name={isUpvoted ? "arrow-up-bold" : "arrow-up-bold-outline"} 
              size={20} 
              color={isUpvoted ? "#EB5528" : "black"}  
            />
              <Text style={[styles.upvoteText,
                {
                  color: isUpvoted
                    ? '#EB5528'       
                    : isDownvoted
                    ? '#695CF7'       
                    : 'black'
                }
              ]}>{post.upvotes[0].sum || 0}</Text>            
          </TouchableOpacity>

          <View style={styles.voteSeparator} />
            <TouchableOpacity onPress={() => onVotePressed(-1)} style={styles.right}>
              <MaterialCommunityIcons 
                name={isDownvoted ? "arrow-down-bold" : "arrow-down-bold-outline"} 
                size={20} 
                color={isDownvoted ? "#695CF7" : "black"}  
              />
            </TouchableOpacity>
        </View>

        <View style={{ marginLeft: 5 }}>
          <TouchableOpacity style={styles.footerButtonContainer}>
            <MaterialCommunityIcons name="comment-outline" size={19} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.otherButtonContainer}>
          <TouchableOpacity style={styles.footerButtonContainer}>
            <MaterialCommunityIcons name="trophy-outline" size={19} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButtonContainer}>
            <MaterialCommunityIcons name="share-outline" size={19} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  username: {
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
    // marginTop: 10
    paddingHorizontal: 15,
    backgroundColor: 'white',
    paddingBottom: 5
    // gap: 5,
  },
  iconBox: {
    borderWidth: 0.5,
    borderColor: '#D4D4D4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 15
  },
  footerButtonContainer: {
    flexDirection: 'row',
    borderWidth: 0.25,
    borderColor: '#202123',
    borderRadius: 50,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  otherButtonContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    gap: 5
    // backgroundColor: 'yellow'
  },
  left: {
    flexDirection: 'row',
    // backgroundColor: 'lime',
    alignItems: 'center',
    gap: 8,
  },
  right: {
    marginLeft: 5,
    // backgroundColor: 'yellow',
    // paddingHorizontal: 4,
    // marginRight: 13,
    // paddingRight: 50
  },
  upvoteText: {
    marginLeft: -5,
    marginRight: 15
  },
  voteSeparator: {
    height: 12,
    width: 1,
    backgroundColor: '#1E1F21',
    marginVertical: 3,
    // marginHorizontal: 5
  }
})