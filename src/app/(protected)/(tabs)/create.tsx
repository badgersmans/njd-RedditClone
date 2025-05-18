import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons';

export default function Create() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => console.log('close button pressed...')}>
          <Ionicons name="close-outline" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: 'auto'}} onPress={() => console.log('pressed...')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Post</Text>
          </View>
        </TouchableOpacity>
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
    marginHorizontal: 10
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
})