import { StyleSheet, Text, View,
// AsyncStorage 
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../../global/styles'
import { ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { UpdateOrderAction, fetchAllOrders } from '../../redux/actions/OrdersAction'
import { DeleteOrderAction } from '../../redux/actions/OrdersAction'

const CardOrder = ({idRestaurant,order,orderId}) => {
  useEffect(() =>{
    if(order.Status == "Chờ xác nhận..." && order.Status != "Done")
    {
                    setShow(true)
                    setShowSum(true)
    }
    if(order.Status != "Chờ xác nhận..." && order.Status != "Done")
    {
                  setShow(true)
                  setShowSum(false)
    }
    if(order.Status == "Done" && order.Status != "Chờ xác nhận...")
    {
                    setShow(false)
                    setShowSum(false)
    }
    infoRestaurant()
  },[order.Status])

    const [show,setShow] = useState(false)
    const [showSum,setShowSum] = useState(false)

  const [customer,setCustomer] = useState({})
  const dbRestaurant = useSelector((state) => state.RestaurantsReducer);
  const dispatch = useDispatch()
  const infoRestaurant = () => {
      dbRestaurant.Restaurants.map((item) =>{
          if(idRestaurant == item.id)
          {
            setCustomer({
              district:item.District,
              city:item.City,
              name:item.Name
            })
          }
      })
  }

  const changeStatus = () => {
    dispatch(UpdateOrderAction(orderId,{idRestaurant:order.idRestaurant,Status: "Chờ nhà hàng xác nhận",idCustomer:order.idCustomer,Sum:order.Sum}))
  }

  const changeStatusDone = () => {
    dispatch(UpdateOrderAction(orderId,{idRestaurant:order.idRestaurant,Status: "Done",idCustomer:order.idCustomer,Sum:order.Sum}))
    setShow(false)
  }
  const deleteOrder = () => {
    dispatch(DeleteOrderAction(orderId,order))
    setShow(false)
  }

  return (
    <ScrollView
      style={{borderWidth:1,borderColor:Colors.colorMain, padding:10,borderRadius:10}}
      >
        {false ? (<View>
        <View style={{paddingVertical:10}}>
        <View style={styles.row}>
              <View style={styles.containerTime}>
                      <View style={{flex:3}}>
                          <Icon
                              iconStyle={styles.iconTime}
                              name='storefront'
                              type='material'
                          />
                      </View>
                      <View style={{flex:7,marginLeft:10,flexDirection:'row',justifyContent: 'center',}}>
                        <Text style={styles.textTimeRestaurant}>{customer.name} , </Text>
                          <Text style={styles.textTimeRestaurant}>{customer.district} , {customer.city}</Text>
                      </View>
              </View>
        </View>
        {showSum ? (        <View style={styles.row}>
          <View style={styles.containerTime}>
              <View style={{flex:3}}>
                {
                  order.Status == "Chờ nhà hàng xác nhận" ? (
                  <Icon
                    iconStyle={styles.iconTime}
                    name='restaurant-menu'
                    type='material'
                />) : null
                }
                {
                  order.Status == "Chờ xác nhận..." ? (
                  <Icon
                    iconStyle={styles.iconTime}
                    name='schedule'
                    type='material'
                  />
                  ) : null
                }
                {
                 order.Status == "Đang được giao" ?  (
                    <Icon
                    iconStyle={styles.iconTime}
                    name='delivery-dining'
                    type='material'
                  />
                  ) : null
                }

              </View>
              <View style={{flex:7,marginLeft:10,}}>
                  <Text style={styles.textTime}>10 phút</Text>
              </View>
          </View>
        </View>) : null}
        {showSum ? (        
        <View style={styles.row}>
        <View style={styles.containerTime}>
            <View style={{flex:3}}>
                <Icon
                    iconStyle={styles.iconTime}
                    name='payments'
                    type='material'
                />
            </View>
            <View style={{flex:7,marginLeft:10,}}>
                <Text style={styles.textTime}>{order.Sum}</Text>
            </View>
        </View>
        </View>) : null}

        <View style={styles.row}>
          <View style={styles.containerTime}>
              <View style={{flex:1,marginLeft:10,}}>
                  <Text style={styles.textTime}>{order.Status}</Text>
              </View>
          </View>
        </View>
        </View>
        {order.Status == "Chờ xác nhận..." ? ( <View 
              style={{flex:1, justifyContent: 'space-between',flexDirection:'row'}}
              >
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {changeStatus()}}>
                  <Text
                  style={{fontSize:20,fontWeight:'bold',color:'white'}}
                  >Chấp Nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.btn}
              onPress={() => {deleteOrder()}}
              >
              <Text
                  style={{fontSize:20,fontWeight:'bold',color:'white'}}
                  >Hủy Đơn</Text>
              </TouchableOpacity>
        </View>) : null}
        {order.Status == "Vui lòng chờ chúng tôi giao hàng" ? ( <View 
              style={{flex:1, justifyContent: 'center',flexDirection:'row'}}
              >
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {changeStatusDone()}}>
                  <Text
                  style={{fontSize:20,fontWeight:'bold',color:'white'}}
                  >Đã nhận đơn</Text>
              </TouchableOpacity>
        </View>) : null}
        </View>) : null}


    </ScrollView>
  )
}

export default CardOrder

const styles = StyleSheet.create({
  btn:{
      width:150,
      paddingVertical:10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:Colors.colorMain,
      borderRadius:24
    },
    btnIcon:{
      height:24,
      width:24,
      color:Colors.colorMain
    },
    row:{
      flexDirection:'row',
      paddingVertical:10
  },
  textTime:{
      color:'black',
      fontWeight:'bold',
      fontSize:16,
      textAlign:'center'
  },
  textTimeRestaurant:{
      color:'black',
      fontWeight:'bold',
      fontSize:16,
      textAlign:'center'
  },
  containerAddress:{
      flexDirection:'row',
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  containerTime:{
      flexDirection:'row',
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
  }
})