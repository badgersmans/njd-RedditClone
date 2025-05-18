import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

export default function Create() {

  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const onGoBack = () => {
    setTitle('')
    setBody('')
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onGoBack}>
          <Ionicons name="close-outline" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: 'auto'}} onPress={() => console.log('pressed...')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Post</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* END HEADER */}

      {/* SUBREDDIT SELECTOR */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingVertical: 10}}>
          <View style={styles.subredditPicker}>
            <Text style={styles.rText}>r/</Text>
            <Text style={styles.selectCommunityText}>Select a community</Text>
          </View>

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