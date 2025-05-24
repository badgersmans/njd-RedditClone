import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import PostListItem from '../../../components/PostListItem'
import { deletePostById, fetchPostById } from '../../services/postService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSupabase } from '../../../lib/supabase'
import {Entypo, AntDesign} from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function PostDetails() {
  const supabase = useSupabase()
  const {id} = useLocalSearchParams<{id: string}>()
  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id, supabase)
  })

    const {mutate: deletePost, isPending} = useMutation({
    mutationFn: () => deletePostById(id, supabase),
    onSuccess: (data) => {
      // console.log(data)

      // invalidate queries that might have been affected by deleting a post
      queryClient.invalidateQueries({queryKey: ['posts']})
      router.back()
    },
    onError: (error) => {
      console.log(error)
      // Alert.alert('Failed to create post', error.message)
    }
  })

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error || !data) {
    return <Text>Post not found</Text>
  }

  return (
    <View>
      <Stack.Screen 
        options={{
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity onPress={() => deletePost()}>
                <View style={styles.circularButton}>
                  <Entypo onPress={() => deletePost()} name="trash" size={18} color="white" />
                </View>
              </TouchableOpacity>

              <View style={styles.circularButton}>
                <AntDesign name="search1" size={21} color="white" />
              </View>

              <View style={styles.circularButton}>
                <MaterialCommunityIcons name="share-outline" size={24} color="white" />
              </View>

              <View style={styles.circularButton}>
                <Entypo name="dots-three-horizontal" size={18} color="white" />
              </View>
            </View>
          )
        }}
      />
      <PostListItem post={data} isDetailedPost />
    </View>
  )
}

const styles = StyleSheet.create({
  circularButton: {
    backgroundColor: '#1A0E21',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
})