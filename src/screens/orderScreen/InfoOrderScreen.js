import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { Colors } from '../../global/styles'

const InfoOrderScreen = ({dbCustomer,dbRestaurant,sum}) => {
    
  return (
    <View style={styles.container}>
        {dbCustomer.map((item,index)=>(
            <View style={styles.row}
            key={index}>
                <View style={styles.containerAddress}>
                    <View style={{flex:3}}>
                        <Icon
                            iconStyle={styles.iconAddress}
                            name='place'
                            type='material'
                        />
                    </View>
                    <View style={{flex:7,marginLeft:10,}}>
                        <Text style={styles.address}>{item.District} ,{item.City}</Text>
                    </View>
                </View>
            </View>
        ))}
        {dbRestaurant.map((item,index)=> (
            <View style={styles.row} 
            key={index}>
            <View style={styles.containerTime}>
                    <View style={{flex:3}}>
                        <Icon
                            iconStyle={styles.iconTime}
                            name='storefront'
                            type='material'
                        />
                    </View>
                    <View style={{flex:7,marginLeft:10,flexDirection:'row',justifyContent: 'center',}}>
                        <Text style={styles.textTimeRestaurant}>{item.Name}  </Text>
                        <Text style={styles.textTimeRestaurant}>{item.District} ,{item.City}</Text>
                    </View>
            </View>
            </View>
        ))}

      <View style={styles.row}>
        <View style={styles.containerTime}>
            <View style={{flex:3}}>
                <Icon
                    iconStyle={styles.iconTime}
                    name='schedule'
                    type='material'
                />
            </View>
            <View style={{flex:7,marginLeft:10,}}>
                <Text style={styles.textTime}>30 phút</Text>
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
            <View style={{flex:7,marginLeft:10,}}>
                <Text style={styles.textTime}>{sum}</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default InfoOrderScreen

const styles = StyleSheet.create({
    address:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center'
    },
    iconAddress:{
        color:'white',
        paddingVertical:10
    },
    containerTime:{
        flexDirection:'row',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconTime:{
        color:'white',
        paddingVertical:10
    },
    container:{
        backgroundColor:Colors.colorMain,
        borderRadius:16,
        paddingVertical:14
    },
    row:{
        flexDirection:'row',
        paddingVertical:10
    },
    textTime:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,
        textAlign:'center'
    },
    textTimeRestaurant:{
        color:'white',
        fontWeight:'bold',
        fontSize:12,
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