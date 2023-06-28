import { View } from 'react-native'
import Header from '../components/Header'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardRestaurant from './restaurantScreen/CardRestaurant';
import { Colors } from '../global/styles';
import { ScrollView } from 'react-native'
import { orderRef } from '../../firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onSnapshot, query, where } from "firebase/firestore";

const RestaurantHomeScreen = ({navigation}) => {
  useEffect(() =>{
      infoOrder()
      getOrderObserver()
  },[])
   function getOrderObserver(){
    onSnapshot(query(orderRef, where( "Status", "==", "Chờ nhà hàng xác nhận")), (snapshot) =>{
      snapshot.forEach((doc) => {
        AsyncStorage.getItem("idRestaurant").then(result =>{
          if(doc.data().idRestaurant == result)
            {
              setShow(true)
              setIdCustomer(doc.data().idCustomer)
              setOrder(doc.data())
            }
          })
    });
    })
}


  const [show,setShow] = useState(false)
  const [idCustomer,setIdCustomer] = useState('')
  const [idOrder,setIdOrder] = useState("")
  const [order,setOrder] = useState({})

  const dbOrder = useSelector((state) => state.OrdersReducer);
  const infoOrder = () => {
      dbOrder.Orders.map((item) =>{
        AsyncStorage.getItem("idRestaurant").then(result =>{
              if(item.Status == "Chờ nhà hàng xác nhận" && item.idRestaurant == result)
              {
                  setIdOrder(item.id)
                  infoDishOrdered(item.id)
              }
            })
      })
  }

    //dishOrdered
    const [dishOrdered,setDishOrdered] = useState([])
    const dbDishOrdered = useSelector((state) => state.DishOrderedReducer);
    const infoDishOrdered = (idOrder) => {
      dbDishOrdered.DishOrdered.map((item) =>{
          if(idOrder == item.IdOrdered)
          {
              setDishOrdered(item)
          }
      })
    }

  return (
    <ScrollView>
      <Header
      type={"storefront"}
      title={"Restaurant"}
      />
            <View style={{margin:10, backgroundColor:Colors.cardbackground,borderRadius:10}}>
                <CardRestaurant
                    order={order}
                    show={show}
                    idOrder={idOrder}
                    setShow={setShow}
                    dishOrdered={dishOrdered}
                    idCustomer={idCustomer}
                />
            </View>
    </ScrollView>
  )
}

export default RestaurantHomeScreen

