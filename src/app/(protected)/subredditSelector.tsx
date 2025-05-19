import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import {AntDesign, EvilIcons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSetAtom } from 'jotai';
import { selectedSubredditAtom } from '../../atoms'
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchSubreddit } from '../services/subredditService';
import { Tables } from '../../types/database.types';

type Group = Tables<'groups'>

export default function SubredditSelector() {
  const [search, setSearch] = useState<string>('')
  const setSubreddit = useSetAtom(selectedSubredditAtom);
  
  const {data, isLoading, error} = useQuery({
    queryKey: ['subreddit', search],
    queryFn: () => fetchSubreddit(search),
    staleTime: 5000,
    placeholderData: (previousData) => previousData
  })

  const onSelectSubreddit = (group: Group) => {
    // console.log('Selected:', group.name);
    setSubreddit(group)
  
    router.back()
  }

  if(isLoading) {
    return <ActivityIndicator />
  }
  if(error || !data) {
    return <Text>Failed to load communities</Text>
  }

  // const filteredSubreddits = data.filter((group) => group.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  // console.log(filteredSubreddits)

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.searchBox}>
        <AntDesign name="search1" size={21} color="grey" />
        <TextInput
          placeholder='Search for a community'
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={'grey'}
        />
        {search && (
          <TouchableOpacity onPress={() => setSearch('')} style={{marginLeft: 'auto'}}>
            <EvilIcons name="close-o" size={24} color="#818187"/>
          </TouchableOpacity>
        )
        }
      </View>

      <FlatList 
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onSelectSubreddit(item)}>
            <View style={styles.listContainer}>
              <Image source={{uri: item.image}} style={styles.image}/>
              <Text>{item.name}</Text>
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
  searchBox: {
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