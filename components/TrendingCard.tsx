import { images } from '@/constants/images'
import { TrendingCardProps } from '@/interfaces/interfaces'
import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

const TrendingCard = ({album: {album_id, title, cover_url}, index}: TrendingCardProps) => {
  return (
    <Link href={`/records/${index}`} asChild>
      <View className="w-32 relative pl-5 items-center">
        <Image
          source={{ uri: cover_url }}
          className="w-32 h-32 rounded-lg"
          resizeMode="cover"
        />
        <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
            <MaskedView maskElement={
                <Text className="font-bold text-6xl">{index + 1}</Text>
            }>
                <Image source={images.gradient} className='size-14' resizeMode='cover'/>
            </MaskedView>
        </View>
        <Text className='text-sm font-bold mt-2 text-light' numberOfLines={2} ellipsizeMode='tail'>
            {title}
        </Text>
      </View>
    </Link>
  )
}

export default TrendingCard