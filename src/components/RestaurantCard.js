import React from 'react';
import {Text,View,Image,StyleSheet,Dimensions} from 'react-native';

import {Colors} from '../global/styles';

import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RestaurantCard({
    restaurantName,
    cityAddress,
    districtAddress,
    phoneNumber,
}){

    return(
        <View style={{flex:1}}>
            <View style={styles.cardView}>
                <View style ={{flexDirection:'row'}}>
                    <Image 
                        style ={{...styles.image, flex:4, height:200, borderTopLeftRadius:10,borderBottomLeftRadius:10}}
                        source = {{uri:'https://i.pinimg.com/564x/92/75/95/927595a6ff51c8f3c826c653d62d4983.jpg'}}
                    />
                    <View style={{flex:6, justifyContent: 'center'}}>
                        <View style={{flexDirection:'row',marginLeft: 8,paddingVertical:10}}>
                            <Icon
                                name='home'
                                type='material'
                                color={Colors.grey1}
                            />
                            <Text style ={styles.restaurantName}>{restaurantName}
                            </Text>
                        </View>
                        <View>
                            <View style={{flexDirection: 'row',marginLeft: 8,paddingVertical:10}}>
                            <Icon
                            name='phone'
                            type='material'
                            color={Colors.grey1}
                            />
                            <Text style ={styles.phoneNumber}>{phoneNumber}</Text>
                            </View>
                            <View style={{flexDirection: 'row',marginLeft: 8,paddingVertical:10}}>
                            <Icon
                            name='place'
                            type='material'
                            color={Colors.grey1}
                            />
                            <Text style = {styles.Address}>{districtAddress}, {cityAddress}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
        cardView:{
            marginHorizontal:10,
            borderRadius:10,
            borderWidth:1,
            borderColor:Colors.grey4,
        },
        image:{
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
         },
         restaurantName:{
            fontSize:17,
            fontWeight:'bold',
            color:Colors.grey1,  
            marginLeft:10
         },
         phoneNumber:{
            fontSize:17,
            fontWeight:'bold',
            color:Colors.grey1,  
            marginLeft:10
         },
         Address:{
            fontSize:17,
            fontWeight:'bold',
            color:Colors.grey1,  
            marginLeft:10
         },
})