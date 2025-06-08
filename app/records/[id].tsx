import { ThemedScreen } from '@/components/ThemedScreen';
import { fetchAlbumDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';



const RecordDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: album, loading } = useFetch(() => fetchAlbumDetails(id as string));

  return (

    <ThemedScreen className='flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image source={{ uri: album?.cover_xl }} className='w-full h-[550px]' resizeMode='stretch' />
        </View>

        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-xl font-bold text-primary mb-3'>{album?.title}</Text>
          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-secondary text-m'>
              {album?.nb_tracks} tracks ·
            </Text>
            <Text className='text-secondary text-m'>
              {album ? Math.round(album.duration / 60) : ''} min
            </Text>
          </View>
          <View className='flex-row items-centerpx-2 py-1 gap-x-1 mt-2'>
            <Text className='text-light text-m'>by</Text>
            <Text className='text-secondary text-m'>{album?.artist?.name}</Text>
            <Text className='text-secondary text-m'>·</Text>
            <Text className='text-secondary text-m'>{album?.label}</Text>
          </View>
          <Text className='text-secondary text-m mt-6'>Genres:</Text>
          <View className='flex-row items-center gap-x-2 mt-3'>
            {album?.genres?.data.map((genre, ids, arr) => (
              <Text key={genre.id} className='text-primary text-m'>
                {genre.name}
                {ids < arr.length - 1 && ' ·'}
              </Text>
            ))}
            </View>
          <Text className='text-secondary text-m mt-8'>
            Release Date: {album?.release_date ? new Date(album.release_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </Text>
        </View>
      </ScrollView>
          
    </ThemedScreen>
  )
}

export default RecordDetails