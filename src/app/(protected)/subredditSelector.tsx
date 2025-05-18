import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import groups from '../../../assets/data/groups.json'
import { useState } from 'react'
import {AntDesign} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SubredditSelector() {
  const [search, setSearch] = useState<string>('')
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.container}>
        <AntDesign name="search1" size={21} color="grey" />
        <TextInput 
          placeholder='Search for a community'
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={'grey'}
        />
      </View>

      <FlatList 
        data={groups}
        renderItem={(group) => (
          <TouchableOpacity>
            <View style={styles.listContainer}>
              <Image source={{uri: group.item.image}} style={styles.image}/>
              <Text>{group.item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.listSeparator}/>
        )}
        ListFooterComponent={() => (
          <View style={styles.listSeparator}/>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#DFDFE2',
    padding: 8,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 8
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  listSeparator: {
    borderWidth: 0.7,
    borderColor: '#ECECEC'
  },
  image: {
    height: 50,
    aspectRatio: 1/1,
    borderRadius: 25
  }
})