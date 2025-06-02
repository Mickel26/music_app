import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
        return (
            <ImageBackground className='flex flex-col w-full flex-1 min-w-[112px] min-h-14 mt-6 justify-center items-center'>
                <Image source={icon} className='size-7' tintColor="#622a81" />
                <Text className='text-secondary text-base'>{title}</Text>
            </ImageBackground>
        )
    }
    else {
        return (
            <View className='flex flex-col w-full flex-1 min-w-[112px] min-h-14 mt-6 justify-center items-center'>
                <Image source={icon} className='size-7' tintColor="#bb82db" />
            </View>
        )
    }
}

const _layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabBarStyle: {

            }
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused}
                            icon={icons.home}
                            title="Home"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='saved'
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused}
                            icon={icons.saved}
                            title="Saved"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused}
                            icon={icons.profile}
                            title="Profile"
                        />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout