import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../constants/index';
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'
import Loading from '../components/loading'

export default function AddTripScreen(props) {
    let {id} = props.route.params;
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleAddExpense = async ()=>{
        if(title && amount && category){
            // good to go
            // navigation.goBack();
          setLoading(true);
          let doc = await addDoc(expensesRef, {
            title,
            amount, 
            category,
            tripId: id
          })
          setLoading(false);
          if(doc && doc.id) navigation.goBack();

        }else{
            // show error
            Snackbar.show({
              text: 'Please fill all the fields!',
              backgroundColor: 'red'
          });
        }
    }

    return (
        <ScreenWrapper>
            <View className="flex justify-between h-full mx-4">
                <View>
                    <View className="relative mt-5">
                        <View className="absolute top-0 left-0 z-10">
                            <BackButton />
                        </View>

                        <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Expense</Text>
                    </View>

                    <View className="flex-row justify-center my-3 mt-5">
                        <Image className="h-72 w-72" source={require('../assets/images/expenseBanner.png')} />
                    </View>
                    <View className="space-y-2 mx-2">
                        <Text className={`${colors.heading} text-lg font-bold`}>What for?</Text>
                        <TextInput value={title} onChangeText={value => setTitle(value)} className="p-4 bg-white rounded-full mb-3" />
                        <Text className={`${colors.heading} text-lg font-bold`}>So, how much?</Text>
                        <TextInput value={amount} onChangeText={value => setAmount(value)} className="p-4 bg-white rounded-full mb-3" />
                    </View>

                    <View className="mx-2 my-2 space-x-2">
                        <Text className="text-lg font-bold">Category</Text>
                        <ScrollView 
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false} 
                            contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                            className="my-2"
                        >
                            {
                                categories.map(cat => {
                                    let bgColor = 'bg-white';
                                    if (cat.value == category) bgColor = 'bg-blue-200'
                                    return (
                                        <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value}
                                            className={`rounded-full ${bgColor} px-4 p-5 mb-2 mr-2`}>
                                            <Text className="text-md">{cat.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

                <View>
                    {
                        loading ? (
                            <Loading />
                        ) : (
                            <TouchableOpacity onPress={handleAddExpense} className="my-6 rounded-full p-3 shadow-sm mx-2 bg-blue-400">
                                <Text className="text-center text-white text-lg font-bold">Add Expense</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </ScreenWrapper>
    )
}
