import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth, tripsRef } from '../config/firebase';
import { useSelector } from 'react-redux';
import { getDoc, getDocs, query, where } from 'firebase/firestore';

const items = [
    {
      id: 1, 
      place: 'Gujrat', 
      country: 'Pakistan'
    },
    {
      id: 2, 
      place: 'London Eye',
      country: 'England',
    },
    {
      id: 3, 
      place: 'Washington dc',
      country: 'America',
    },
    {
      id: 4, 
      place: 'New york',
      country: 'America'
    }
  ]

const HomeScreen = async() => {
  const navigation = useNavigation();

  const {user} = useSelector(state=> state.user);
  const [trips, setTrips] = useState(items);

  const isFocused = useIsFocused();

  const fetchTrips = async ()=>{
      const q = query(tripsRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach(doc=>{
          // console.log('documement: ',doc.data());
          data.push({...doc.data(), id: doc.id})
      })
      setTrips(data);
  }

  useEffect(()=>{
      if(isFocused)
          fetchTrips();
  },[isFocused])

  const handleLogout = async ()=>{
      await signOut(auth);
  }
  return (
    <ScreenWrapper className="flex-1">
        <View className="flex-row justify-between items-center p-4">
            <Text className={"font-bold text-3xl shadow-sm"}>Voyagyr</Text>
            <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border border-black-200 rounded-full">
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-3 mb-3">
            <Image source={require('../assets/images/banner.png')} className="w-60 h-60"/>
        </View>
        <View className="px-4 space-y-3">
            <View className="flex-row justify-between items-center">
                <Text className={'font-bold text-xl'}>Recent Trips</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('AddTrip')} className="p-2 px-3 bg-white border border-black-200 rounded-full">
                <Text>Add Trip</Text>
                </TouchableOpacity>
            </View>
            <View style={{height: 460}}>
                <FlatList
                   data={trips}
                   ListEmptyComponent={<EmptyList message={"No trips found"}/>}
                   numColumns={2}
                   className="mx-0.5"
                   showsVerticalScrollIndicator={false}
                   columnWrapperStyle={{justifyContent:'space-between'}}
                   keyExtractor={item=>item.id}
                   renderItem = {({item})=>{
                    return(
                        <TouchableOpacity onPress={()=> navigation.navigate("TripExpenses", {...item})} className="bg-white p-3 rounded-xl mb-2">
                            <View>
                                <Image source={randomImage()} className="w-40 h-40 mb-2"/>
                                <Text className="font-bold">{item.place}</Text>
                                <Text className="text-xs">{item.country}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                   }}
                />
            </View>
        </View>
    </ScreenWrapper>
  )
}

export default HomeScreen