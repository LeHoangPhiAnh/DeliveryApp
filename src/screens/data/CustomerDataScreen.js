import { View,FlatList,TouchableOpacity,ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import OrderedCard from '../../components/OrderedCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../global/styles';
import { Icon } from 'react-native-elements';

const CustomerDataScreen = ({navigation}) => {
  const [idOrdered,setIdOrdered] = useState('')
  const dbOrdered = useSelector((state) => state.OrdersReducer);
  const dbCustomer = useSelector((state) => state.CustomersReducer);
  const dbRestaurant = useSelector((state) => state.RestaurantsReducer);
  const [nameRestaurant,setNameRestaurant] = useState("")
  const [nameCustomer,setNameCustomer] = useState("")
  useState(() => {
    dbOrdered.Orders.map(item=>{
      dbCustomer.Customers.map(Customer => {
        if(item.idCustomer == Customer.id)
        {
          setNameCustomer(Customer.Name)
        }
      })
      dbRestaurant.Restaurants.map(Restaurant=>{
        if(item.idRestaurant == Restaurant.id)
        {
          setNameRestaurant(Restaurant.Name)
        }
      })
    })
    setNameRestaurant()
    setNameCustomer()
  },[])
  const renderItemDishes = ({item}) =>{
        return(
            <TouchableOpacity
            onPress={() => {
              setIdOrdered(item.id)
            }}
            style={{marginVertical:10}}>
                    <OrderedCard 
                        Sum ={item.Sum}
                        Status={item.Status}
                        nameRestaurant={nameRestaurant}
                        nameCustomer={nameCustomer}
                    />
            </TouchableOpacity>
        )            
    
}
  return (
    <ScrollView>
      <FlatList 
            style ={{marginVertical:10}} 
            data = {dbOrdered.Orders}
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

export default CustomerDataScreen
