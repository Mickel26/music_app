import { Album } from '@/interfaces/interfaces'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

const MusicCard = ({ id, cover_big, title, artist }: Album) => {
  return (
    <Link href={`/records/${id}`} asChild>
      <TouchableOpacity className='w-[45%] flex-1 items-center justify-center'>
        <Image
          source={{ uri: cover_big }}
          className='w-44 h-44 rounded-lg mb-2'
          resizeMode='cover'
        />
        <Text
          className='text-primary font-semibold max-w-full h-6 text-center'
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text className='text-dark-200'>
          {artist.name}
        </Text>
        <Text>

        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default MusicCard