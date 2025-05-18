import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Create() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
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
      <View style={styles.subredditPicker}>
        <Text style={styles.rText}>r/</Text>
        <Text style={styles.selectCommunityText}>Select a community</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
})