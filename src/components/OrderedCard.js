import React from 'react';
import {Text,View,Image,StyleSheet,Dimensions} from 'react-native';

import {Colors} from '../global/styles';

import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderedCard({
    Sum,
    Status,
    nameRestaurant,
    nameCustomer
}){
    return(
        <View style={{flex:1}}>
            <View style={styles.cardView}>
                <View style ={{flexDirection:'row'}}>
                    <View style={{flex:6, justifyContent: 'center'}}>
                        <View style={{flexDirection:'row',marginLeft: 8,paddingVertical:10}}>
                            <Icon
                                name='payments'
                                type='material'
                                color={Colors.grey1}
                            />
                            <Text style ={styles.OrderedName}>{Sum}
                            </Text>
                        </View>
                        <View>
                            <View style={{flexDirection: 'row',marginLeft: 8,paddingVertical:10}}>
                            <Icon
                            name='task-alt'
                            type='material'
                            color={Colors.grey1}
                            />
                            <Text style ={styles.phoneNumber}>{Status}</Text>
                            </View>

                            <View style={{flexDirection: 'row',marginLeft: 8,paddingVertical:10}}>
                            <Icon
                            name='task-alt'
                            type='material'
                            color={Colors.grey1}
                            />
                            <Text style ={styles.phoneNumber}>{nameRestaurant}</Text>
                            </View>

                            <View style={{flexDirection: 'row',marginLeft: 8,paddingVertical:10}}>
                            <Icon
                            name='task-alt'
                            type='material'
                            color={Colors.grey1}
                            />
                            <Text style ={styles.phoneNumber}>{nameCustomer}</Text>
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
         OrderedName:{
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