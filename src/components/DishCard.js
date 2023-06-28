import React from 'react';
import {Text,View,Image,StyleSheet,Dimensions} from 'react-native';

import {Colors} from '../global/styles';

import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DishCard({
    DishName,
    DishImage
}){
    return(
        <View style={{flex:1}}>
            <View style={styles.cardView}>
                <View style ={{flexDirection:'row'}}>
                    <Image 
                        style ={{...styles.image, flex:4, height:100,borderRadius:50}}
                        source = {{uri:DishImage}}
                    />
                    <View style={{flex:6, justifyContent: 'center'}}>
                        <View style={{flexDirection:'row',marginLeft: 8,paddingVertical:10}}>
                            <Text style ={styles.DishName}>{DishName}
                            </Text>
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
         DishName:{
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