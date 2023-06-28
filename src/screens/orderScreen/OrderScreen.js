import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import InfoOrderScreen from './InfoOrderScreen'
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native'
import { Colors } from '../../global/styles'
import { TouchableOpacity } from 'react-native'
import DishOrderScreen from './DishOrderScreen'
import { ScrollView,
  // AsyncStorage 
} from 'react-native'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {CreateOrderAction, DeleteOrderAction, UpdateOrderAction, fetchAllOrders} from '../../redux/actions/OrdersAction'
import AsyncStorage from '@react-native-community/async-storage'
import { CreateDishOrderedAction } from '../../redux/actions/DishOrderedAction'
const OrderScreen = (
  props
  ) => {
  const dispatch = useDispatch()
  const handleInvibleOrder = () =>
  { props.setInvisibleOrder(false)}

  useEffect(() =>{
      addCustomer()
      addRestaurant()
  },[props.modalVisibleOrder])

  //data Restaurant
  const [restaurant,setRestaurant] = useState([])
  const dbRestaurant = useSelector((state) => state.RestaurantsReducer);
  const addRestaurant = () => {
    dbRestaurant.Restaurants.map((item) => {
      AsyncStorage.getItem('idRestaurant').then(result => {
        if(item.id == result)
        {
            setRestaurant([...restaurant,item])
        }
      })
    })
  }
  //data Customer
  const [customer,setCustomer] = useState([])
  const dbCustomer = useSelector((state) => state.CustomersReducer);
  const addCustomer = () => {
    dbCustomer.Customers.map((item) => {
      AsyncStorage.getItem('id').then(result =>{
        if(item.id == result)
        {
            setCustomer([...customer,item])
        }
      })

    })
  }

  const Order = useSelector((state) => state.OrdersReducer)


  //sumTotal
  const calculatePrice = props.dishOrdered.reduce((preVal, currentVal) => {
    return preVal + currentVal.Sum
  },0)

  const uploadDishOrdered = () => {
    Order.Orders.map((item) => {
      AsyncStorage.getItem('idRestaurant').then(idRestaurant =>{
        AsyncStorage.getItem('id').then(idCustomer => {
          if(item.idCustomer == idCustomer && item.idRestaurant == idRestaurant && item.Status == "Order...")
          {
            props.dishOrdered.forEach(dish => {
              dispatch(CreateDishOrderedAction({...dish,IdOrdered:item.id}))
            })}
        })
      })
    })

  }
  
  const updateOrder = () =>{
    Order.Orders.map((item) => {
      AsyncStorage.getItem('idRestaurant').then(idRestaurant =>{
        AsyncStorage.getItem('id').then(idCustomer => {
          if(item.idCustomer == idCustomer && item.idRestaurant == idRestaurant && item.Status == "Order...")
          {
            dispatch(UpdateOrderAction(item.id,{    
              idCustomer: idCustomer,
              idRestaurant: idRestaurant,
              Status:"Chờ xác nhận...",
              Sum:calculatePrice,}))
          }
        })
      })
    })
  }


  const renderItemOrdered = ({item,navigation}) =>{
    return(
      <View>
        <DishOrderScreen
        dishOrdered={props.dishOrdered}
        dishDisplay={item}
        setDishOrdered={props.setDishOrdered}
        removeDish={props.removeDish}
        />
      </View>
   )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={{paddingVertical:10,flexDirection:'row'}}>
        <Text style={styles.title}>Đặt Món</Text>

        <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => {          
        handleInvibleOrder()
        }}
          >
          <Icon 
          type='material'
          name='keyboard-arrow-down'
          iconStyle={styles.closeIcon}
          />
        </TouchableOpacity>

      </View>
      <InfoOrderScreen 
      dbCustomer={customer}
      dbRestaurant={restaurant}
      sum={calculatePrice}
      />
      <FlatList
      data={props.dishOrdered}
      style={{height:200,marginVertical:4}}
      renderItem={renderItemOrdered}
      />
      <TouchableOpacity
      onPress={() =>{
      props.setInvisible(false)
      handleInvibleOrder()
      updateOrder()
      uploadDishOrdered()
      dispatch(fetchAllOrders())
      props.setIndexCheck()
      //props.finalOrder()

      }}
      style={{padding:10,borderRadius:10,backgroundColor:Colors.colorMain,marginTop: 10,}}>
        <Text style={{textAlign:'center',fontSize:24,fontWeight:'bold', color:'white'}}>
          Đặt
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
    title:{
        paddingLeft:10,
        fontSize:24,
        fontWeight:'bold',
        color:Colors.colorMain
    },
    container:{
      padding:20,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      backgroundColor:'white',
    },
    closeButton:{
      position:'absolute',
      right: 20,
      top: 10,
      borderRadius:12,
      backgroundColor:Colors.colorMain,
    },
    closeIcon:{
      height:24,
      width:24,
      color:'white',
    },
    containerBox:{
      backgroundColor:Colors.cardbackground,
      padding:10,
      borderRadius:10,
      marginVertical:5,
      flexDirection:'row',
      borderBottomColor:Colors.grey3,
      borderWidth:1
    }
})