import { View,FlatList,TouchableOpacity,ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import DishCard from '../../components/DishCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../global/styles';
import { Icon } from 'react-native-elements';

const DishDataScreen = ({navigation}) => {
    const [idDish,setIdDish] = useState('')
    const dbDishes = useSelector((state) => state.DishesReducer);
    const renderItemDishes = ({item}) =>{
 
          return(
              <TouchableOpacity
              onPress={() => {
                setIdDish(item.id)
              }}
              style={{marginVertical:10}}>
                      <DishCard 
                          DishName ={item.Name}
                          DishImage={item.Image}
                      />
              </TouchableOpacity>
          )            
      
  }
    return (
      <ScrollView>
        <FlatList 
              style ={{marginVertical:10}} 
              data = {dbDishes.Dishes}
              renderItem = {renderItemDishes}  
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

export default DishDataScreen
