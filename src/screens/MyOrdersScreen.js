import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'

import {View} from 'react-native'
import { useSelector } from 'react-redux'
import CardOrder from './cardOrder/CardOrderScreen';
import Header from '../components/Header';
import { Colors } from '../global/styles';
import { orderRef } from '../../firebase-config';
import { onSnapshot, query, where } from 'firebase/firestore';


export default function MyOrdersScreen({navigation}){
    useEffect(() =>{
        infoOrder()
        getOrderObserver()
    },[])

    const [idRestaurant,setIdRestaurant] = useState('')
    const [order,setOrder] = useState({})
    const [orderId,setOrderID] = useState()
    function getOrderObserver(){
        onSnapshot(query(orderRef, where( "Status", "!=", "Done")), (snapshot) =>{
          snapshot.forEach((doc) => {
            AsyncStorage.getItem("id").then(result =>{
              if(doc.data().idCustomer == result)
                {
                  setIdRestaurant(doc.data().idRestaurant)
                  setOrder(doc.data())
                }
              })
        });
        })

    }
    
    const dbOrder = useSelector((state) => state.OrdersReducer);
    const infoOrder = () => {
        dbOrder.Orders.map((item) =>{
            AsyncStorage.getItem("id").then(result =>{
                if(item.Status != "Done" && item.idCustomer == result)
                {
                    setOrderID(item.id)
                }
            })
        })
    }

    return(
        <View>
            <Header title ="Order"  type ="arrow-left" navigation ={navigation}/>  
            <View style={{margin:10, backgroundColor:Colors.cardbackground,borderRadius:10}}>
                <CardOrder
                    idRestaurant={idRestaurant}
                    order={order}
                    orderId={orderId}
                />
            </View>
        </View>
    )
}