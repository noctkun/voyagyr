import { View, Text, StatusBar, Platform } from 'react-native'
import React from 'react'

const ScreenWrapper = ({children}) => {
    let statusBarHeight = Platform.OS === 'ios' ? 30 : 10;
  return (
    <View style={{paddingTop: statusBarHeight}}>
      {
        children
      }
    </View>
  )
}

export default ScreenWrapper