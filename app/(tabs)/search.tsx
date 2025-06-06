import MusicCard from "@/components/MusicCard";
import SearchBar from "@/components/SearchBar";
import { ThemedScreen } from "@/components/ThemedScreen";
import { images } from "@/constants/images";
import { fetchMusic } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const search = () => {
  const [searchQuery, setsearchQuery] = useState('');

  const { data: music, loading: musicLoading, error: musicError, refetch: loadMusic, reset } = useFetch(() => fetchMusic({
    query: searchQuery,
  }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMusic();
      }
      else {
        reset();
      }
    }, 500)

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (music?.length > 0 && music?.[0]) {
      // Update search count in Appwrite
      updateSearchCount(searchQuery, music[0]);
    }
  }, [music]);

  return (
    <ThemedScreen className="flex-1">
      <Image source={images.logo} className="size-36 mt-20 mx-auto" resizeMode="cover" />
      <View className="flex-1 px-5">
        <SearchBar
          value={searchQuery}
          onChangeText={(text: string) => setsearchQuery(text)}
          placeholder="Search for music"
          autoFocus
        />
        <FlatList
          data={music}
          renderItem={({ item }) => (<MusicCard {...item} />)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          className="mt-4 pb-32 ml-2"
          columnWrapperStyle={{
            justifyContent: 'center',
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              {musicLoading && (
                <View className="flex-1 items-center justify-center">
                  <ActivityIndicator size="large" />
                </View>
              )}

              {musicError && (
                <Text className="text-red-500 px-3 my-3">Error: {musicError?.message}</Text>
              )}

              {!musicLoading && !musicError && searchQuery.trim() && music?.length > 0 && (
                <Text className="font-bold text-primary text-2xl pb-5">
                  Search results for
                  <Text className="text-secondary mt-4 pb-32 ml-2"> {searchQuery}</Text>
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            !musicLoading && !musicError ? (
              <View className="mt-10 px-5">
                <Text className="text-secondary text-center mt-5">{searchQuery.trim() ? 'No albums found' : 'Search for an album'}</Text>
              </View>
            ) : null
          }
        />
      </View>
    </ThemedScreen>
  )
}

export default search