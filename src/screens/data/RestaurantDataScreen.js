import { View,FlatList,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import RestaurantCard from '../../components/RestaurantCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../global/styles';
import { Icon } from 'react-native-elements';

const RestaurantDataScreen = ({navigation}) => {
  const [idRestaurant,setIdRestaurant] = useState('')
  const dbRestaurant = useSelector((state) => state.RestaurantsReducer);
  const renderItemRestaurants = ({item}) =>{
    console.log(item)
        return(
            <TouchableOpacity
            onPress={() => {
                setIdRestaurant(item.id)
            }}
            style={{marginVertical:10}}>
                    <RestaurantCard 
                        restaurantName ={item.Name}
                        cityAddress = {item.City}
                        districtAddress = {item.District}
                        phoneNumber={item.PhoneNumber}
                    />
            </TouchableOpacity>
        )            
    
}
  return (
    <ScrollView>
      <FlatList 
            style ={{marginVertical:10}} 
            data = {dbRestaurant.Restaurants}
            renderItem = {renderItemRestaurants}  
        />
                <View style={{height:100,borderRadius: 25,justifyContent: 'center',alignItems: 'center',}}>
                <TouchableOpacity
                style={{padding:20,borderRadius:40,backgroundColor:Colors.colorMain}}>
                  <Icon
                    name='add'
                    type='materual'
                    iconStyle={{color:'white'}}
                    />
                </TouchableOpacity>
                </View>
    </ScrollView>
  )
}

export default RestaurantDataScreen
