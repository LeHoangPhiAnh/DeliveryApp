import { StyleSheet, Text, View,TouchableOpacity  } from 'react-native'

import React, { useEffect } from 'react'
import { Icon } from 'react-native-elements'
import { Colors } from '../../global/styles'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOrderAction } from '../../redux/actions/OrdersAction'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OrderInvisibleScreen = (props) => {
    const dispatch = useDispatch()
    const calculatePrice = props.dishOrdered.reduce((preVal, currentVal) => {
      return preVal + currentVal.Sum
    },0)
    const Order = useSelector((state) => state.OrdersReducer)
    const handleVisibleOrder = () =>{
        props.setVisible(true)
    }
    const deleteOrder = () => {
      Order.Orders.map((item) => {
        AsyncStorage.getItem('idRestaurant').then(idRestaurant =>{
          AsyncStorage.getItem('id').then(idCustomer => {
            if(item.idCustomer == idCustomer && item.idRestaurant == idRestaurant && item.Status == "Order...")
            {
              dispatch(DeleteOrderAction(item.id,{    
                idCustomer: idCustomer,
                idRestaurant: idRestaurant,
                Status:"Chờ nhà hàng xác nhận",
                Sum:calculatePrice,}))
            }
          })
        })
      })
    }
  return (
    <View style={styles.container}>
        <View style={{paddingVertical:10}}>
        <Text style={styles.title}>Đặt Món</Text>
        <TouchableOpacity style={styles.closeButton}
        onPress={handleVisibleOrder}
        >
          <Icon 
          type='material'
          name='expand-less'
          iconStyle={styles.closeIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity 
        style={{...styles.closeButton,marginRight:40}}
        onPress={() => {
          deleteOrder()
          props.setInvisible(false)
          props.setIndexCheck()
          props.removeAllDish()
        }}
          >
          <Icon 
          type='material'
          name='close'
          iconStyle={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OrderInvisibleScreen

const styles = StyleSheet.create({
    title:{
        paddingLeft:10,
        fontSize:24,
        fontWeight:'bold',
        color:'white'
    },
    container:{
      justifyContent: 'space-between',
      padding:10,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      backgroundColor:Colors.colorMain,
    },
    closeButton:{
        position:'absolute',
        right: 20,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeIcon:{
        height:28,
        width:28,
        color:'white',
      },
})