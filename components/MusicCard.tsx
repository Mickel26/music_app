import { Album } from '@/interfaces/interfaces'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

const MusicCard = ({ id, cover_big, title, release_date, genres }: Album) => {
  console.log({ cover_big })
  return (
    <Link href={`/records/${id}`} asChild>
      <TouchableOpacity className='w-[45%] flex-1 items-center justify-center'>
        <Image
          source={{ uri: cover_big }}
          className='w-44 h-44 rounded-lg mb-2'
          resizeMode='cover'
        />
        <Text
          className='text-dark-100 font-semibold max-w-full h-12 text-center'
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default MusicCard