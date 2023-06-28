import { StyleSheet, Text, View, 
  // AsyncStorage
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../../global/styles'
import { ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { UpdateOrderAction } from '../../redux/actions/OrdersAction'
import { DeleteOrderAction } from '../../redux/actions/OrdersAction'
import { fetchAllOrders } from '../../redux/actions/OrdersAction'
import AsyncStorage from '@react-native-community/async-storage'
import { FlatList } from 'react-native'
import CardDishOrdered from './CardDishOrdered'
const CardRestaurant = ({order,show,setShow,idOrder,dishOrdered,idCustomer,setOrder}) => {
    const [list,setList] = useState(false)
    const onclick = () => {
        setList(!list)
    }
  useEffect(() =>{
      infoCustomer(idCustomer)
  },[order.Status])
  const dispatch = useDispatch()

  //customer
  const [customer,setCustomer] = useState({})
  const dbCustomer = useSelector((state) => state.CustomersReducer);
  const infoCustomer = (idCustomer) => {
    dbCustomer.Customers.map((item) =>{
          if(idCustomer == item.id)
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
    dispatch(UpdateOrderAction(idOrder,{idRestaurant:order.idRestaurant,Status: "Vui lòng chờ chúng tôi giao hàng",idCustomer:order.idCustomer,Sum:order.Sum}))
    setShow(false)
  }
  const deleteOrder = () => {
    dispatch(UpdateOrderAction(idOrder,{idRestaurant:order.idRestaurant,Status: "Nhà hàng xin lỗi, món bạn yêu cầu đã hết",idCustomer:order.idCustomer,Sum:order.Sum}))
    setShow(false)
  }

  const renderItemListDishOrdered = ({item}) => {
    return(
        <View>
            <CardDishOrdered
            data={item}
            />
        </View>
    )
  }

  return (
    <ScrollView
      style={{borderWidth:1,borderColor:Colors.colorMain, padding:10,borderRadius:10}}
      >
        {show ? (<View>
        <View style={{paddingVertical:10}}>
        <View style={styles.row}>
              <View style={styles.containerTime}>
                      <View style={{flex:3}}>
                          <Icon
                              iconStyle={styles.iconTime}
                              name='person'
                              type='material'
                          />
                      </View>
                      <View style={{flex:7,marginLeft:10,flexDirection:'row',justifyContent: 'center',}}>
                        <Text style={styles.textTimeRestaurant}>{customer.name}</Text>
                      </View>
              </View>
        </View>
        <View style={styles.row}>
              <View style={styles.containerTime}>
                      <View style={{flex:3}}>
                          <Icon
                              iconStyle={styles.iconTime}
                              name='place'
                              type='material'
                          />
                      </View>
                      <View style={{flex:7,marginLeft:10,flexDirection:'row',justifyContent: 'center',}}>
                        <Text style={styles.textTimeRestaurant}>{customer.district} , {customer.city}</Text>
                      </View>
              </View>
        </View>

        <View style={styles.row}>
              <View style={styles.containerTime}>
                      <View style={{flex:3}}>
                          <Icon
                              iconStyle={styles.iconTime}
                              name='payments'
                              type='material'
                          />
                      </View>
                      <View style={{flex:7,marginLeft:10,flexDirection:'row',justifyContent: 'center',}}>
                        <Text style={styles.textTimeRestaurant}>{order.Sum} vnđ</Text>
                      </View>
              </View>
        </View>

        <View style={styles.row}>
          <View style={styles.containerTime}>
              <View style={{flex:1,marginLeft:10,}}>
                  <Text style={styles.textTime}>{order.Status}</Text>
              </View>
          </View>
        </View>
        
        <View>
            <TouchableOpacity
                onPress={
                  onclick}
            >
                <Icon
                    iconStyle={{...styles.iconTime,color:Colors.colorMain}}
                    name={list ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    type='material'
                />
            </TouchableOpacity>
        </View>
        <View>
        { list ? (<FlatList
                data={dishOrdered}
                renderItem={renderItemListDishOrdered}
                />) : null  }
        </View>


        </View>
        {order.Status == "Chờ nhà hàng xác nhận" ? ( <View 
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
        </View>) : null}

    </ScrollView>
  )
}

export default CardRestaurant

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
  },

})