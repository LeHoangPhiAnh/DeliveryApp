import { View } from 'react-native'
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import CardDelivery from './deliveryScreen/CardDelivery'
import { Colors } from '../global/styles';
import { ScrollView } from 'react-native'
import { fetchAllOrders } from '../redux/actions/OrdersAction'
import { getOrderObserver, orderRef } from '../../firebase-config';
import { onSnapshot, query, where } from 'firebase/firestore'
const DeliveryHome = ({navigation}) => {
  useEffect(() =>{
    getOrderObserver()
},[])
const dispatch = useDispatch()

function getOrderObserver(){
  onSnapshot(query(orderRef, where( "Status", "==", "Vui lòng chờ chúng tôi giao hàng")), (snapshot) =>{
    snapshot.forEach((doc) => {
      AsyncStorage.getItem("idRestaurant").then(result =>{
        if(doc.data().idRestaurant == result)
          {
            setShow(true)
            setIdCustomer(doc.data().idCustomer)
            setOrder(doc.data())
          }
        else{
          setShow(false)
        }
        })
  });
  })
}

const [show,setShow] = useState(false)
const [idCustomer,setIdCustomer] = useState("")
const [order,setOrder] = useState({})

  return (
    <View>
      <Header
      type= {"moped"}
      title={"Delivery"}
      />
            <View style={{margin:10, backgroundColor:Colors.cardbackground,borderRadius:10}}>
                <CardDelivery
                    order={order}
                    show={show}
                    idCustomer={idCustomer}
                />
            </View>
    </View>
  )
}

export default DeliveryHome
