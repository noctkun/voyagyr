import { View, Text, Image } from 'react-native'
import React from 'react'

export default function EmptyList({message}) {
  return (
    <View className="flex justify-center items-center my-5 space-y-3">
        <Image className="w-40 h-40 shadow" source={require('../assets/images/empty.png')}/>
        <Text className="text-gray-400">{message || 'data not found'}</Text>
    </View>
  )
}