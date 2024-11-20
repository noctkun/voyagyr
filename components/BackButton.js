import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import {ChevronLeftIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={()=>navigation.goBack()} className="bg-white rounded-full h-8 w-8">
        <ChevronLeftIcon size="30" color="blue" />
      </TouchableOpacity>
    )    
}