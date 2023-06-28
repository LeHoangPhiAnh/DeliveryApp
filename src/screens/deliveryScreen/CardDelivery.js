import { StyleSheet, Text, View, 
  // AsyncStorage  
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../../global/styles'
import { ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
const CardDelivery = ({order,show,idCustomer}) => {
  useEffect(() =>{
    infoCustomer(idCustomer)
  },[order.Status])

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
              name:item.Name,
              phonenumber:item.PhoneNumber
            })
          }
      })
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
                      <View style={{flex:3}}>
                          <Icon
                              iconStyle={styles.iconTime}
                              name='phone'
                              type='material'
                          />
                      </View>
                      <View style={{flex:7,marginLeft:10,flexDirection:'row',justifyContent: 'center',}}>
                        <Text style={styles.textTimeRestaurant}>{customer.phonenumber}</Text>
                      </View>
              </View>
        </View>
        <View>
        </View>
        </View>
        </View>) : null}
    </ScrollView>
  )
}

export default CardDelivery

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