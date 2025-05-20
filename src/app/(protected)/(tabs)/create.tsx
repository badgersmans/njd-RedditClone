import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useAtom } from "jotai";
import { selectedSubredditAtom } from '../../../atoms';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../services/postService';

export default function Create() {

  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [subreddit, setSubreddit] = useAtom(selectedSubredditAtom);

  const {mutate, data, isPending, error} = useMutation({
    mutationFn: () =>
      createPost({
        title, 
        description: body,
        group_id: '46a63107-a875-4da2-b9eb-28b827f015e1',
        user_id: '199359c7-c5ce-4586-bdd0-34885d92d60f'
      })
  })
  console.log(data)
  console.log(error)

  const onGoBack = () => {
    setTitle('')
    setBody('')
    setSubreddit(null);

    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onGoBack}>
          <Ionicons name="close-outline" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={{marginLeft: 'auto'}}
          disabled={isPending}
          onPress={() => mutate()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{isPending ? 'Posting...' : 'Post'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* END HEADER */}

      {/* SUBREDDIT SELECTOR */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingVertical: 10}}>
          <Link href={'/subredditSelector'} asChild>
            <TouchableOpacity style={styles.subredditPicker}>
              {subreddit ? (
                <>
                  <Image source={{uri: subreddit.image}} style={styles.image}/>
                  <Text style={{fontWeight: '600'}}>{subreddit.name}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.rText}>r/</Text>
                  <Text style={styles.selectCommunityText}>Select a community</Text>
                </>
              )}
            </TouchableOpacity>
          </Link>

          {/* INPUTS */}
          <TextInput 
            placeholder='Title'
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            multiline
            scrollEnabled={false}
          />
          <TextInput 
            placeholder='Write your post'
            value={body}
            onChangeText={setBody}
            multiline
            scrollEnabled={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center'
  },
    button: {
    backgroundColor: '#1E4396',
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  subredditPicker: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    padding: 10,
    borderRadius: 20,
    gap: 7,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  image: {
    height: 20,
    aspectRatio: 1/1,
    borderRadius: 10
  },
  rText: {
    backgroundColor: 'black',
    color: 'white',
    paddingHorizontal: 5,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  selectCommunityText: {
    fontWeight: '500'
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20
  }
})