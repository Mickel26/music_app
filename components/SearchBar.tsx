import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
    onPress: () => void;
    placeholder: string;
}

const SearchBar = ({onPress, placeholder} : Props) => {
    return (
        <View className='flex-row items-center border border-primary border-solid px-5 py-4 rounded-full'>
            <Image
                source={icons.search}
                resizeMode='contain'
                className='w-5 h-5 mr-3'
                tintColor='#bb82db'
            />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value= ''
                onChangeText={() => {}}
                placeholderTextColor='#bb82db'
                className='flex-1 text-base ml-2'
            />
        </View>
    )
}

export default SearchBar